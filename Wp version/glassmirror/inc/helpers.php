<?php
/**
 * Content access and the small render helpers every template shares.
 *
 * Class names in here are written out in full, never assembled, because
 * Tailwind finds the classes to compile by reading these files.
 */

defined( 'ABSPATH' ) || exit;

/**
 * Site content exported from the Next.js data files
 * (Wp version/export-content.ts). Pass a key to get one section.
 */
function gm_content( ?string $key = null ) {
	static $content = null;
	if ( null === $content ) {
		$content = json_decode( file_get_contents( get_theme_file_path( 'inc/content.json' ) ), true );
	}
	return null === $key ? $content : $content[ $key ];
}

function gm_business(): array {
	return gm_content( 'business' );
}

function gm_cta( string $key ): string {
	return gm_content( 'cta' )[ $key ];
}

function gm_photo( string $key ): array {
	return gm_content( 'photos' )[ $key ];
}

function gm_service( string $slug ): ?array {
	foreach ( gm_content( 'services' ) as $service ) {
		if ( $service['slug'] === $slug ) {
			return $service;
		}
	}
	return null;
}

function gm_area( string $slug ): ?array {
	foreach ( gm_content( 'serviceAreas' ) as $area ) {
		if ( $area['slug'] === $slug ) {
			return $area;
		}
	}
	return null;
}

/** Services by family, in family order: mega menu, mobile menu, services hub. */
function gm_service_groups(): array {
	$groups = array();
	foreach ( gm_content( 'serviceGroups' ) as $group ) {
		$items = array();
		foreach ( gm_content( 'services' ) as $service ) {
			if ( $service['group'] === $group['id'] ) {
				$items[] = $service;
			}
		}
		$groups[] = array(
			'group' => $group,
			'items' => $items,
		);
	}
	return $groups;
}

/** Site URL for a path like "/services/reglazing". Works in subdirectory installs. */
function gm_url( string $path = '/' ): string {
	return home_url( $path );
}

/** URL of a theme asset. Content image paths ("/images/…") resolve under assets/. */
function gm_asset( string $path ): string {
	return get_theme_file_uri( 'assets/' . ltrim( $path, '/' ) );
}

function gm_tel(): string {
	return 'tel:' . gm_business()['phoneHref'];
}

function gm_pad( int $number ): string {
	return sprintf( '%02d', $number );
}

/** Attribute string with a leading space. null/false skip, true is a bare attribute. */
function gm_attrs( array $attrs ): string {
	$out = '';
	foreach ( $attrs as $name => $value ) {
		if ( null === $value || false === $value ) {
			continue;
		}
		$out .= true === $value ? " $name" : sprintf( ' %s="%s"', $name, esc_attr( (string) $value ) );
	}
	return $out;
}

/** Reveal-on-scroll attributes (assets/js/theme.js adds .is-in). */
function gm_reveal( string $kind = 'up', int $delay = 0 ): string {
	return gm_attrs(
		array(
			'data-reveal' => $kind,
			'style'       => $delay ? "--reveal-delay:{$delay}ms" : null,
		)
	);
}

/**
 * <img> for a theme photo. `fill` mirrors next/image: the image covers its
 * positioned parent. Photos ship with the theme, so there is no srcset.
 */
function gm_img( array $photo, string $class = '', array $opts = array() ): string {
	$priority = ! empty( $opts['priority'] );
	$class    = trim( ( empty( $opts['fill'] ) ? '' : 'absolute inset-0 h-full w-full ' ) . $class );

	return '<img' . gm_attrs(
		array(
			'src'           => gm_asset( $photo['src'] ),
			'alt'           => $opts['alt'] ?? $photo['alt'],
			'width'         => $photo['width'],
			'height'        => $photo['height'],
			'class'         => $class ? $class : null,
			'loading'       => $priority ? null : 'lazy',
			'fetchpriority' => $priority ? 'high' : null,
			'decoding'      => 'async',
			'aria-hidden'   => $opts['aria-hidden'] ?? null,
		)
	) . '>';
}

/**
 * Button or button-styled link. $label is HTML. Options: variant, size,
 * class, arrow, type (buttons only), attrs (extra attributes).
 */
function gm_button( string $label, string $href = '', array $o = array() ): string {
	$variants = array(
		'primary'   => 'bg-gold text-charcoal hover:bg-gold-bright active:bg-gold-deep shadow-[0_1px_0_0_rgba(23,28,25,0.12)]',
		'secondary' => 'bg-forest text-bone hover:bg-forest-soft active:bg-forest-deep',
		'outline'   => 'border border-charcoal/25 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-bone',
		'onDark'    => 'border border-bone/30 text-bone hover:bg-bone hover:text-charcoal hover:border-bone',
	);
	$sizes    = array(
		'md' => 'px-6 py-3.5 text-[0.78rem]',
		'lg' => 'px-8 py-4.5 text-[0.85rem]',
	);

	$class = 'group relative inline-flex items-center justify-center gap-2.5 font-display font-bold uppercase tracking-[0.08em] transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:opacity-55 disabled:pointer-events-none min-h-[44px] text-center '
		. $variants[ $o['variant'] ?? 'primary' ] . ' ' . $sizes[ $o['size'] ?? 'md' ]
		. ( empty( $o['class'] ) ? '' : ' ' . $o['class'] );

	$inner = '<span>' . $label . '</span>' . ( empty( $o['arrow'] ) ? '' : gm_icon( 'arrow-right', 'arrow-shift size-4 shrink-0', 2.5 ) );
	$attrs = gm_attrs( array( 'class' => $class ) + ( $o['attrs'] ?? array() ) );

	if ( $href ) {
		return '<a href="' . esc_url( $href ) . '"' . $attrs . '>' . $inner . '</a>';
	}
	return '<button type="' . esc_attr( $o['type'] ?? 'button' ) . '"' . $attrs . '>' . $inner . '</button>';
}

/** Small uppercase label with a leading rule (components/ui/SectionHeading Eyebrow). */
function gm_eyebrow( string $label, string $tone = 'dark' ): string {
	return 'dark' === $tone
		? '<span class="t-eyebrow inline-flex items-center gap-3 text-forest"><span aria-hidden="true" class="h-px w-8 bg-forest/50"></span>' . $label . '</span>'
		: '<span class="t-eyebrow inline-flex items-center gap-3 text-gold"><span aria-hidden="true" class="h-px w-8 bg-gold/60"></span>' . $label . '</span>';
}

/** Home link with the transparent logo (components/ui/Logo). */
function gm_logo(): string {
	$name = gm_business()['legalName'];
	return '<a href="' . esc_url( gm_url( '/' ) ) . '" aria-label="' . esc_attr( "$name home" ) . '" class="group inline-flex shrink-0 items-center transition-transform duration-300 hover:-translate-y-0.5">'
		. '<span class="relative block h-[3rem] w-[9.75rem] sm:h-[3.35rem] sm:w-[10.9rem] drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">'
		. '<img src="' . esc_url( gm_asset( 'images/logo.png' ) ) . '" alt="' . esc_attr( "$name logo" ) . '" width="1440" height="763" fetchpriority="high" class="h-full w-full object-contain object-left">'
		. '</span></a>';
}

/** Container widths from components/ui/Container. */
function gm_container( string $width = 'default' ): string {
	$widths = array(
		'default' => 'mx-auto w-full px-5 sm:px-8 lg:px-10 max-w-[80rem]',
		'wide'    => 'mx-auto w-full px-5 sm:px-8 lg:px-10 max-w-[92rem]',
	);
	return $widths[ $width ];
}

/** Section vertical rhythm from components/ui/Container. */
function gm_space( string $space = 'default' ): string {
	$spaces = array(
		'tight'   => 'py-14 md:py-20 lg:py-24',
		'default' => 'py-16 md:py-24 lg:py-32',
		'loose'   => 'py-20 md:py-28 lg:py-40',
	);
	return $spaces[ $space ];
}

/** Lucide icons (lucide-static 0.469.0, the version the Next.js site uses). */
function gm_icon( string $name, string $class = 'size-4', float $stroke = 2 ): string {
	static $icons = array(
		'arrow-right'         => '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
		'arrow-left'          => '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
		'arrow-up-right'      => '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
		'chevron-down'        => '<path d="m6 9 6 6 6-6"/>',
		'chevron-right'       => '<path d="m9 18 6-6-6-6"/>',
		'chevron-left'        => '<path d="m15 18-6-6 6-6"/>',
		'phone'               => '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
		'plus'                => '<path d="M5 12h14"/><path d="M12 5v14"/>',
		'x'                   => '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
		'menu'                => '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
		'mail'                => '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
		'clock'               => '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
		'map-pin'             => '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
		'shield-check'        => '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
		'target'              => '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
		'compass'             => '<path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/><circle cx="12" cy="12" r="10"/>',
		'layout-grid'         => '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
		'pencil-ruler'        => '<path d="M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13"/><path d="m8 6 2-2"/><path d="m18 16 2-2"/><path d="m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17"/><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',
		'message-square-text' => '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M13 8H7"/><path d="M17 12H7"/>',
		'circle-check'        => '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
		'image-plus'          => '<path d="M16 5h6"/><path d="M19 2v6"/><path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/><circle cx="9" cy="9" r="2"/>',
		'star'                => '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
	);

	return sprintf(
		'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="%s" stroke-linecap="round" stroke-linejoin="round" class="%s" aria-hidden="true" focusable="false">%s</svg>',
		$stroke,
		esc_attr( $class ),
		$icons[ $name ]
	);
}

/** Brand marks for the company's profiles and chat channels (components/ui/BrandIcons). */
function gm_brand_icon( string $name, string $class ): string {
	static $paths = array(
		'facebook'  => 'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 011.141.195v3.325a8.623 8.623 0 00-.653-.036 26.805 26.805 0 00-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 00-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647z',
		'whatsapp'  => 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488',
		'messenger' => 'M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.652V24l4.088-2.242c1.092.301 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z',
	);

	return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" class="' . esc_attr( $class ) . '"><path d="' . $paths[ $name ] . '"/></svg>';
}
