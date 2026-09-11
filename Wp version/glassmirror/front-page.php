<?php
/**
 * Home page (app/page.tsx + components/sections/RedesignedHome, TestimonialsSection,
 * ReviewsCarousel, maps/ServiceAreaLeaflet). Carousel, map and hero video are
 * driven by assets/js/theme.js.
 */

defined( 'ABSPATH' ) || exit;

$b       = gm_business();
$reviews = gm_content( 'googleReviews' );
$quotes  = gm_content( 'testimonials' );
$items   = gm_content( 'galleryItems' );

/** First gallery photo in a category — one strong photo per work type. */
$first = function ( $category ) use ( $items ) {
	$match = wp_list_filter( $items, array( 'category' => $category ) );
	return $match ? reset( $match ) : $items[0];
};
$mirror = $items[0];
foreach ( $items as $item ) {
	if ( false !== strpos( $item['src'], 'custom-mirrors-015' ) ) {
		$mirror = $item;
	}
}

$highlights = array(
	array( 'custom-shower-enclosures', gm_photo( 'showerEnclosure' ), 'Shower enclosures', 'Glass that fits the opening', 'Custom shower enclosures and doors measured to the stall, finished clean, and installed for everyday use.', 'md:col-span-7 md:row-span-2', 'aspect-[4/3] md:aspect-auto md:min-h-0 md:flex-1' ),
	array( 'custom-mirrors', gm_photo( 'mirrorInstall' ), 'Mirrors & walls', 'Mirrors that open the room', 'Custom mirrors and mirrored walls sized for vanities, entries, gyms and commercial interiors.', 'md:col-span-5', 'aspect-[16/10]' ),
	array( 'windows-and-doors', gm_photo( 'windowGlass' ), 'Windows & glass', 'Windows, doors and repair', 'Window glass, double-pane work, solar screens and reglazing when a pane fails or a frame needs fresh glass.', 'md:col-span-5', 'aspect-[16/10]' ),
);

$workflow = array(
	array( '01', 'We measure', 'We look at the opening, access, glass type and how the finished piece has to sit.' ),
	array( '02', 'We set the plan', 'You get a clear scope, a price and a schedule before fabrication or install starts.' ),
	array( '03', 'We do the work', 'Glass is cut, tempered or sourced as needed, then installed with care for the surrounding finishes.' ),
	array( '04', 'We leave it clean', 'Hardware is checked, the area is cleaned, and the space is ready to use.' ),
);

$stars = function ( $rating ) {
	$out = '<span class="inline-flex items-center gap-0.5" aria-label="' . esc_attr( "$rating out of 5 stars" ) . '">';
	for ( $i = 0; $i < 5; $i++ ) {
		$out .= gm_icon( 'star', $i < round( $rating ) ? 'size-4 fill-gold text-gold' : 'size-4 text-bone/25' );
	}
	return $out . '</span>';
};

/** Gallery tile with a caption; aspect matched to the source so nothing crops into the wrong shape. */
$work = function ( $photo, $aspect, $class, $delay ) {
	return '<figure' . gm_reveal( 'scale', $delay ) . ' class="group relative overflow-hidden ' . $aspect . ' ' . $class . '">'
		. gm_img( $photo, 'img-zoom object-cover', array( 'fill' => true ) )
		. '<div aria-hidden="true" class="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-charcoal/90 via-charcoal/35 to-transparent"></div>'
		. '<figcaption class="absolute right-4 bottom-4 left-4 font-display text-[0.72rem] font-bold tracking-[0.13em] text-bone uppercase">' . esc_html( $photo['caption'] ) . '</figcaption></figure>';
};

$estimate_button = function ( $location, $size = 'md', $variant = 'primary' ) {
	return gm_button(
		esc_html( gm_cta( 'estimate' ) ),
		gm_url( '/contact' ),
		array(
			'variant' => $variant,
			'size'    => $size,
			'arrow'   => true,
			'attrs'   => array(
				'data-cta'      => 'estimate',
				'data-location' => $location,
			),
		)
	);
};

get_header();
?>
<div class="home-redesign">
	<section class="relative isolate min-h-[min(760px,88dvh)] overflow-hidden bg-charcoal text-bone">
		<?=
		gm_img(
			gm_photo( 'showerEnclosure' ),
			'pointer-events-none object-cover object-center opacity-70',
			array(
				'fill'        => true,
				'priority'    => true,
				'alt'         => '',
				'aria-hidden' => 'true',
			)
		)
		?>
		<?php /* Decorative motion (Mixkit 101377, Mixkit Free License). theme.js plays it unless reduced motion is on. */ ?>
		<video data-hero-video class="hero-video absolute inset-0 size-full object-cover" muted loop playsinline preload="metadata" poster="<?= esc_url( gm_asset( gm_photo( 'showerEnclosure' )['src'] ) ) ?>" aria-hidden="true" tabindex="-1">
			<source src="<?= esc_url( gm_asset( 'videos/glass-reflections-hero.mp4' ) ) ?>" type="video/mp4">
		</video>
		<div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-charcoal/40"></div>
		<div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,12,17,0.98)_0%,rgba(5,12,17,0.91)_42%,rgba(5,12,17,0.35)_76%,rgba(5,12,17,0.58)_100%)]"></div>
		<div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_28%,rgba(20,196,196,0.18),transparent_28%)]"></div>
		<div aria-hidden="true" class="hero-glass-grid pointer-events-none absolute inset-y-0 right-0 hidden w-[44%] lg:block"></div>
		<div aria-hidden="true" class="grain pointer-events-none absolute inset-0"></div>

		<div class="<?= gm_container( 'wide' ) ?> relative z-10 grid min-h-[min(760px,88dvh)] items-end gap-12 pb-12 pt-28 sm:pb-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pb-18">
			<div class="max-w-[42rem] lg:col-span-7">
				<div<?= gm_reveal( 'right' ) ?>><p class="eyebrow-line text-gold">Martinez Orlyn · Houston, Texas</p></div>
				<div<?= gm_reveal( 'up', 80 ) ?>>
					<h1 class="hero-hook mt-7 text-bone">Houston glass, mirrors &amp; showers. <span class="text-gold">Measured to fit.</span></h1>
				</div>
				<div<?= gm_reveal( 'up', 150 ) ?>>
					<p class="mt-6 max-w-[38rem] text-[1rem] leading-relaxed text-bone/78 sm:text-[1.08rem]">Custom shower enclosures, mirrors, window glass and repair for Houston-area homes and commercial spaces—planned around the opening, finish and everyday use.</p>
				</div>
				<div<?= gm_reveal( 'up', 230 ) ?>>
					<div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
						<?= $estimate_button( 'home_hero', 'lg' ) ?>
						<a href="<?= esc_attr( gm_tel() ) ?>" data-cta="phone" data-location="home_hero" class="inline-flex min-h-[44px] items-center gap-2 px-3 font-display text-[0.9rem] font-bold tracking-[0.08em] text-bone transition-colors hover:text-gold">
							<?= gm_icon( 'phone', 'size-4 text-gold', 2.5 ) ?>
							<?= esc_html( $b['phone'] ) ?>
						</a>
					</div>
				</div>
				<div<?= gm_reveal( 'up', 300 ) ?>>
					<ul class="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-bone/18 pt-5 text-[0.78rem] font-semibold tracking-[0.04em] text-bone/72">
						<li>Licensed &amp; insured</li>
						<li>Family-owned</li>
						<li>Residential + commercial</li>
					</ul>
				</div>
			</div>

			<div<?= gm_reveal( 'left', 180 ) ?> class="hero-glass-panel hidden p-7 lg:col-span-4 lg:col-start-9 lg:block xl:p-9">
				<p class="font-display text-[0.68rem] font-bold tracking-[0.16em] text-gold uppercase">From measure to install</p>
				<p class="mt-5 max-w-[16ch] font-display text-[1.7rem] font-extrabold leading-[1.03] tracking-[-0.035em] text-bone">The opening leads. The glass follows.</p>
				<ol class="mt-8 border-t border-bone/20">
					<?php foreach ( array( array( '01', 'Site measure', 'Opening, access and finish' ), array( '02', 'Clear scope', 'Glass, hardware and schedule' ), array( '03', 'Clean install', 'Fit checked before handoff' ) ) as list( $number, $title, $detail ) ) : ?>
						<li class="grid grid-cols-[2rem_1fr] gap-3 border-b border-bone/14 py-4">
							<span class="font-display text-[0.68rem] font-bold text-gold"><?= esc_html( $number ) ?></span>
							<span>
								<strong class="block font-display text-[0.9rem] font-bold text-bone"><?= esc_html( $title ) ?></strong>
								<span class="mt-1 block text-[0.78rem] leading-relaxed text-bone/58"><?= esc_html( $detail ) ?></span>
							</span>
						</li>
					<?php endforeach; ?>
				</ol>
			</div>
		</div>
	</section>

	<section id="about" class="bg-bone py-16 sm:py-20 lg:py-24">
		<div class="<?= gm_container() ?> grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
			<div<?= gm_reveal( 'scale' ) ?> class="relative min-h-[23rem] overflow-hidden sm:min-h-[31rem] lg:col-span-6">
				<a href="<?= esc_url( gm_url( '/about' ) ) ?>" class="group relative block size-full min-h-[23rem] sm:min-h-[31rem]" aria-label="About Martinez Orlyn Glass &amp; Mirror">
					<?=
					gm_img(
						gm_photo( 'aboutShop' ),
						'object-cover transition-transform duration-500 group-hover:scale-[1.02]',
						array(
							'fill'     => true,
							'priority' => true,
						)
					)
					?>
					<div class="absolute bottom-0 left-0 bg-forest px-5 py-4 text-bone sm:px-7 sm:py-5">
						<p class="font-display text-[1.8rem] font-extrabold tracking-[-0.04em]"><?= esc_html( $b['experienceValue'] ) ?></p>
						<p class="text-[0.7rem] font-bold tracking-[0.14em] text-bone/70 uppercase"><?= esc_html( $b['experienceLabel'] ) ?></p>
					</div>
				</a>
			</div>

			<div class="lg:col-span-5 lg:col-start-8">
				<div<?= gm_reveal() ?>><p class="eyebrow-line text-forest">About <?= esc_html( $b['name'] ) ?></p></div>
				<div<?= gm_reveal( 'up', 70 ) ?>><h2 class="home-h2 mt-6 max-w-[18rem] text-charcoal">Local shop. Clear work.</h2></div>
				<div<?= gm_reveal( 'up', 130 ) ?>>
					<p class="mt-6 text-[1.02rem] leading-relaxed text-muted"><?= esc_html( $b['name'] ) ?> is a Houston glass and mirror company for custom showers, mirrors, windows and glass repair. We measure the opening, match the glass to the use, and leave the space ready.</p>
				</div>
				<div<?= gm_reveal( 'up', 180 ) ?>>
					<div class="mt-8 grid gap-3 border-t border-charcoal/15 pt-6 text-[0.9rem] text-charcoal sm:grid-cols-2">
						<?php foreach ( array( 'Houston-based shop', 'Appointment scheduling', 'Residential + commercial', 'Licensed & insured' ) as $point ) : ?>
							<span class="inline-flex items-center gap-2"><?= gm_icon( 'plus', 'size-4 text-forest', 3 ) ?> <?= esc_html( $point ) ?></span>
						<?php endforeach; ?>
					</div>
				</div>
				<?=
				gm_button(
					'Meet the company',
					gm_url( '/about' ),
					array(
						'variant' => 'outline',
						'arrow'   => true,
						'class'   => 'mt-9',
					)
				)
				?>
			</div>
		</div>
	</section>

	<section aria-label="<?= esc_attr( "{$b['name']} at a glance" ) ?>" class="border-b border-charcoal-line bg-charcoal text-bone">
		<div class="<?= gm_container( 'wide' ) ?> grid gap-0 md:grid-cols-4">
			<?php foreach ( array( array( $b['experienceValue'], $b['experienceLabel'] ), array( 'Licensed', "License {$b['license']}" ), array( "{$b['radiusMiles']} mi", 'Houston coverage' ) ) as list( $value, $label ) ) : ?>
				<div class="border-forest-soft py-6 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0">
					<p class="font-display text-[2rem] font-extrabold tracking-[-0.04em] text-bone"><?= esc_html( $value ) ?></p>
					<p class="mt-1 text-[0.78rem] font-bold tracking-[0.1em] text-bone/55 uppercase"><?= esc_html( $label ) ?></p>
				</div>
			<?php endforeach; ?>
			<div class="flex items-center border-forest-soft px-0 py-6 md:justify-end md:border-l md:px-8">
				<div class="flex items-center gap-3 text-[0.9rem] text-bone/75">
					<?= gm_icon( 'shield-check', 'size-5 text-gold', 1.8 ) ?>
					<span>Licensed &amp; insured. By appointment.</span>
				</div>
			</div>
		</div>
	</section>

	<section class="relative isolate overflow-hidden bg-charcoal py-20 text-bone sm:py-24 lg:py-28">
		<div aria-hidden="true" class="glass-facet pointer-events-none absolute -top-64 -right-40 size-[48rem] text-bone/[0.045]"></div>
		<div aria-hidden="true" class="grain pointer-events-none absolute inset-0"></div>

		<div class="<?= gm_container() ?> relative z-10">
			<div class="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
				<div class="lg:col-span-7">
					<div<?= gm_reveal() ?>><p class="eyebrow-line text-gold">Mission &amp; vision</p></div>
					<div<?= gm_reveal( 'up', 70 ) ?>>
						<h2 class="home-h2 mt-6 max-w-[16ch] text-bone">Why the work is <span class="text-gold">done this way.</span></h2>
					</div>
					<div<?= gm_reveal( 'up', 130 ) ?>>
						<p class="mt-7 max-w-[54ch] text-[1.05rem] leading-relaxed text-bone/72">Most glass work does not fit a catalog size. The opening that matters is the one with tile on three sides, a threshold that is not square, and a finish the homeowner expects to keep. That is the work this shop is set up for.</p>
					</div>
					<div<?= gm_reveal( 'up', 190 ) ?>>
						<div class="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
							<?= $estimate_button( 'home_mission_vision' ) ?>
							<a href="<?= esc_attr( gm_tel() ) ?>" data-cta="phone" data-location="home_mission_vision" class="inline-flex min-h-[44px] items-center gap-2.5 font-display text-[1.02rem] font-bold tracking-tight text-bone transition-colors hover:text-gold">
								<?= gm_icon( 'phone', 'size-4 text-gold', 2.4 ) ?>
								<?= esc_html( $b['phone'] ) ?>
							</a>
						</div>
					</div>
				</div>

				<div<?= gm_reveal( 'scale', 150 ) ?> class="group relative aspect-[4/5] overflow-hidden sm:aspect-[16/10] lg:col-span-4 lg:col-start-9 lg:aspect-[4/5]">
					<?= gm_img( gm_photo( 'showerEnclosureAlt' ), 'img-zoom object-cover', array( 'fill' => true ) ) ?>
					<div aria-hidden="true" class="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/5 to-transparent"></div>
					<p class="absolute right-5 bottom-5 left-5 font-display text-[0.7rem] font-bold tracking-[0.14em] text-bone/85 uppercase">Custom shower · measured to the opening</p>
				</div>
			</div>

			<?php get_template_part( 'template-parts/principles', null, array( 'class' => 'mt-16 grid gap-x-14 gap-y-12 border-t border-charcoal-line pt-12 lg:mt-20 lg:grid-cols-2' ) ); ?>
		</div>
	</section>

	<section id="services" class="bg-white py-20 sm:py-28 lg:py-32">
		<div class="<?= gm_container() ?>">
			<div<?= gm_reveal() ?>><p class="eyebrow-line text-forest">What we handle</p></div>
			<div<?= gm_reveal( 'up', 70 ) ?>>
				<div class="mt-6 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
					<h2 class="home-h2 max-w-[42rem] text-charcoal">Services for the jobs that matter.</h2>
					<a href="<?= esc_url( gm_url( '/services' ) ) ?>" class="link-arrow shrink-0 text-charcoal">See every service <?= gm_icon( 'arrow-right', 'size-4', 2.4 ) ?></a>
				</div>
			</div>

			<div class="mt-12 grid gap-4 md:grid-cols-12 md:grid-rows-[minmax(13rem,auto)_minmax(13rem,auto)]">
				<?php foreach ( $highlights as $i => list( $slug, $image, $eyebrow, $title, $copy, $class, $image_class ) ) : ?>
					<div<?= gm_reveal( 'up', $i * 90 ) ?> class="<?= esc_attr( $class ) ?>">
						<a href="<?= esc_url( gm_url( "/services/$slug" ) ) ?>" class="group flex h-full flex-col overflow-hidden bg-charcoal text-bone">
							<div class="relative overflow-hidden <?= esc_attr( $image_class ) ?>">
								<?= gm_img( $image, 'img-zoom object-cover', array( 'fill' => true ) ) ?>
								<div aria-hidden="true" class="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/10 to-transparent"></div>
							</div>
							<div class="relative -mt-20 p-6 sm:p-8">
								<p class="text-[0.7rem] font-bold tracking-[0.16em] text-gold uppercase"><?= esc_html( $eyebrow ) ?></p>
								<h3 class="mt-3 font-display text-[1.65rem] font-extrabold tracking-[-0.03em] text-bone sm:text-[2rem]"><?= esc_html( $title ) ?></h3>
								<p class="mt-3 max-w-[35rem] text-[0.94rem] leading-relaxed text-bone/72"><?= esc_html( $copy ) ?></p>
								<span class="mt-6 inline-flex items-center gap-2 font-display text-[0.72rem] font-bold tracking-[0.14em] text-gold uppercase">View service <?= gm_icon( 'arrow-up-right', 'size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5', 2.2 ) ?></span>
							</div>
						</a>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
	</section>

	<section class="bg-charcoal py-20 text-bone sm:py-28 lg:py-32">
		<div class="<?= gm_container() ?> grid gap-10 lg:grid-cols-12 lg:gap-16">
			<div class="relative min-h-[24rem] overflow-hidden lg:col-span-7 lg:min-h-[34rem]">
				<?= gm_img( gm_photo( 'glassWork' ), 'object-cover', array( 'fill' => true ) ) ?>
			</div>
			<div class="flex flex-col justify-center lg:col-span-4 lg:col-start-9">
				<div<?= gm_reveal() ?>><p class="eyebrow-line text-gold"><?= esc_html( gm_cta( 'emergency' ) ) ?></p></div>
				<div<?= gm_reveal( 'up', 70 ) ?>><h2 class="home-h2 mt-6 text-bone">Need glass work scheduled? Call us.</h2></div>
				<div<?= gm_reveal( 'up', 130 ) ?>>
					<p class="mt-6 text-[1rem] leading-relaxed text-bone/72">Whether it is a shower, a mirror wall, a window pane or reglazing, we will help you set an appointment and explain what the job needs.</p>
				</div>
				<div<?= gm_reveal( 'up', 190 ) ?>>
					<div class="mt-9 flex flex-col items-start gap-5">
						<a href="<?= esc_attr( gm_tel() ) ?>" data-cta="phone" data-location="home_support" class="inline-flex items-center gap-3 font-display text-[1.45rem] font-extrabold tracking-tight text-bone transition-colors hover:text-gold">
							<?= gm_icon( 'phone', 'size-5 text-gold', 2.4 ) ?>
							<?= esc_html( $b['phone'] ) ?>
						</a>
						<?= $estimate_button( 'home_support', 'md', 'onDark' ) ?>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section id="how-we-work" class="bg-bone py-20 sm:py-24 lg:py-28">
		<div class="<?= gm_container() ?>">
			<div class="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-x-16">
				<div class="lg:col-span-5">
					<div<?= gm_reveal() ?>><p class="eyebrow-line text-forest">How we work</p></div>
					<div<?= gm_reveal( 'up', 70 ) ?>><h2 class="home-h2 mt-6 text-charcoal">A clear plan before the first cut.</h2></div>
					<div<?= gm_reveal( 'up', 130 ) ?>>
						<p class="mt-6 max-w-[28rem] text-[1rem] leading-relaxed text-muted">
							Good glass work starts before fabrication. We measure the site, set the sequence and keep
							the install part of a clean finish.
						</p>
					</div>
				</div>
				<ol class="lg:col-span-7">
					<?php foreach ( $workflow as $i => list( $number, $title, $body ) ) : ?>
						<li<?= gm_reveal( 'up', $i * 70 ) ?> class="grid gap-4 border-t border-charcoal/15 py-6 first:border-t-0 first:pt-0 sm:grid-cols-[3.5rem_minmax(0,10.5rem)_1fr] sm:gap-6 sm:py-7 sm:first:pt-0">
							<span class="font-display text-[0.72rem] font-bold tracking-[0.16em] text-gold"><?= esc_html( $number ) ?></span>
							<h3 class="font-display text-[1.1rem] font-extrabold tracking-tight text-charcoal"><?= esc_html( $title ) ?></h3>
							<p class="max-w-[34rem] text-[0.94rem] leading-relaxed text-muted"><?= esc_html( $body ) ?></p>
						</li>
					<?php endforeach; ?>
				</ol>
			</div>

			<div<?= gm_reveal( 'scale', 180 ) ?> class="relative mt-12 aspect-[21/9] min-h-[14rem] overflow-hidden sm:mt-14 lg:mt-16">
				<?= gm_img( gm_photo( 'howWeWork' ), 'object-cover', array( 'fill' => true ) ) ?>
			</div>
		</div>
	</section>

	<section id="selected-work" class="bg-charcoal py-20 text-bone sm:py-24 lg:py-28">
		<div class="<?= gm_container() ?>">
			<div class="flex flex-col gap-6 border-b border-charcoal-line pb-8 md:flex-row md:items-end md:justify-between">
				<div class="max-w-[42rem]">
					<div<?= gm_reveal() ?>><p class="eyebrow-line text-gold">Selected work</p></div>
					<div<?= gm_reveal( 'up', 70 ) ?>><h2 class="home-h2 mt-6 text-bone">The work is in the details.</h2></div>
				</div>
				<div<?= gm_reveal( 'up', 120 ) ?>>
					<a href="<?= esc_url( gm_url( '/gallery' ) ) ?>" class="link-arrow shrink-0 text-bone hover:text-gold">View the full gallery <?= gm_icon( 'arrow-right', 'size-4', 2.4 ) ?></a>
				</div>
			</div>

			<div class="mt-10 grid gap-4 lg:grid-cols-12">
				<?= $work( $first( 'Custom Showers' ), 'aspect-[3/4] sm:aspect-[16/10] lg:aspect-[3/4]', 'lg:col-span-5 lg:h-full', 0 ) ?>
				<div class="grid gap-4 lg:col-span-7">
					<?= $work( $mirror, 'aspect-[16/10] lg:aspect-[16/9]', '', 70 ) ?>
					<div class="grid gap-4 sm:grid-cols-2">
						<?= $work( $first( 'Windows & Glass' ), 'aspect-[4/3]', '', 140 ) ?>
						<?= $work( $first( 'Shower Doors' ), 'aspect-[4/3]', '', 210 ) ?>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="<?= gm_space() ?> bg-charcoal text-bone" aria-labelledby="reviews-heading">
		<div class="<?= gm_container() ?>">
			<div class="flex flex-col gap-8 border-b border-charcoal-line pb-10 lg:flex-row lg:items-end lg:justify-between">
				<div class="max-w-2xl">
					<div<?= gm_reveal() ?>><p class="eyebrow-line text-gold">Google reviews</p></div>
					<div<?= gm_reveal( 'up', 60 ) ?>><h2 id="reviews-heading" class="home-h2 mt-6 text-bone">Rated by Houston customers.</h2></div>
					<div<?= gm_reveal( 'up', 110 ) ?>>
						<p class="mt-5 max-w-[36rem] text-[1rem] leading-relaxed text-bone/70">
							Recent Google reviews for Martinez Orlyn Glass &amp; Mirror — showers, mirrors,
							windows and glass repair.
						</p>
					</div>
				</div>

				<div<?= gm_reveal( 'up', 140 ) ?>>
					<a href="<?= esc_url( $reviews['url'] ) ?>" target="_blank" rel="noopener noreferrer" class="inline-flex flex-col gap-3 border border-bone/20 bg-charcoal-soft px-6 py-5 transition-colors hover:border-gold">
						<span class="flex items-center gap-3">
							<span class="font-display text-[2.5rem] leading-none font-extrabold tracking-tight text-bone"><?= esc_html( number_format( $reviews['rating'], 1 ) ) ?></span>
							<?= $stars( $reviews['rating'] ) ?>
						</span>
						<span class="text-[0.82rem] text-bone/65">Based on <?= esc_html( number_format( $reviews['count'] ) . " {$reviews['label']}" ) ?> reviews</span>
						<span class="font-display text-[0.7rem] font-bold tracking-[0.12em] text-gold uppercase">Read reviews on Google →</span>
					</a>
				</div>
			</div>

			<?php /* Auto-advancing carousel; skips ticks while the tab is hidden and respects reduced motion. */ ?>
			<div<?= gm_reveal( 'up', 160 ) ?>>
				<div class="mt-10" data-carousel>
					<div class="relative grid gap-6 lg:grid-cols-12 lg:items-stretch">
						<div class="lg:col-span-8" aria-live="polite" aria-atomic="true">
							<?php foreach ( $quotes as $i => $quote ) : ?>
								<figure data-slide<?= $i ? ' hidden' : '' ?> class="flex h-full min-h-[18rem] flex-col border border-charcoal-line bg-charcoal-soft/80 p-7 sm:p-9">
									<div class="flex items-center justify-between gap-4">
										<?= $stars( $quote['rating'] ?? 5 ) ?>
										<span class="font-display text-[0.68rem] font-bold tracking-[0.14em] text-bone/45 uppercase"><?= ( $i + 1 ) . ' / ' . count( $quotes ) ?></span>
									</div>
									<blockquote class="mt-6 flex-1 text-[1.05rem] leading-relaxed text-bone/90 sm:text-[1.12rem]">“<?= esc_html( $quote['quote'] ) ?>”</blockquote>
									<figcaption class="mt-8 border-t border-bone/12 pt-5">
										<span class="block font-display text-[1rem] font-bold text-bone"><?= esc_html( $quote['author'] ) ?></span>
										<span class="mt-1 block text-[0.8rem] text-bone/55"><?= esc_html( "{$quote['location']} · {$quote['source']}" ) ?></span>
									</figcaption>
								</figure>
							<?php endforeach; ?>
						</div>

						<a href="<?= esc_url( $reviews['url'] ) ?>" target="_blank" rel="noopener noreferrer" class="flex min-h-[14rem] flex-col justify-between border border-bone/15 bg-forest/40 p-7 transition-colors hover:border-gold sm:p-8 lg:col-span-4">
							<div>
								<p class="font-display text-[0.7rem] font-bold tracking-[0.14em] text-gold uppercase">More on Google</p>
								<p class="mt-4 font-display text-[1.35rem] font-extrabold tracking-tight text-bone"><?= esc_html( number_format( $reviews['count'] ) ) ?> reviews from Houston-area customers.</p>
								<p class="mt-4 text-[0.92rem] leading-relaxed text-bone/70">Window replacement, shower glass, mirrors and more — read the full set on Google.</p>
							</div>
							<span class="mt-8 font-display text-[0.72rem] font-bold tracking-[0.12em] text-gold uppercase">Open Google reviews →</span>
						</a>
					</div>

					<?php if ( count( $quotes ) > 1 ) : ?>
						<div class="mt-6 flex items-center justify-between gap-4">
							<div class="flex items-center gap-2" role="tablist" aria-label="Review slides">
								<?php foreach ( $quotes as $i => $quote ) : ?>
									<button type="button" role="tab" data-dot aria-selected="<?= $i ? 'false' : 'true' ?>" aria-label="<?= esc_attr( "Show review by {$quote['author']}" ) ?>" class="h-2 rounded-full transition-all <?= $i ? 'w-2 bg-bone/25 hover:bg-bone/45' : 'w-8 bg-gold' ?>"></button>
								<?php endforeach; ?>
							</div>
							<div class="flex items-center gap-2">
								<button type="button" data-prev aria-label="Previous review" class="inline-flex size-10 items-center justify-center border border-bone/20 text-bone transition-colors hover:border-gold hover:text-gold"><?= gm_icon( 'chevron-left', 'size-5', 2.2 ) ?></button>
								<button type="button" data-next aria-label="Next review" class="inline-flex size-10 items-center justify-center border border-bone/20 text-bone transition-colors hover:border-gold hover:text-gold"><?= gm_icon( 'chevron-right', 'size-5', 2.2 ) ?></button>
							</div>
						</div>
					<?php endif; ?>
				</div>
			</div>
		</div>
	</section>

	<section id="where-we-work" class="bg-white py-20 sm:py-28 lg:py-32">
		<div class="<?= gm_container() ?> grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
			<div class="lg:col-span-4">
				<div<?= gm_reveal() ?>><p class="eyebrow-line text-forest">Where we work</p></div>
				<div<?= gm_reveal( 'up', 70 ) ?>><h2 class="home-h2 mt-6 text-charcoal">Houston and surrounding cities.</h2></div>
				<div<?= gm_reveal( 'up', 130 ) ?>>
					<p class="mt-6 max-w-[28rem] text-[1rem] leading-relaxed text-muted">Houston is home base. The marked cities show the normal service area for showers, mirrors, windows and glass repair.</p>
				</div>
				<div class="mt-7 flex items-center gap-3 text-[0.82rem] font-bold tracking-[0.08em] text-charcoal uppercase">
					<span class="size-3 rounded-full bg-gold" aria-hidden="true"></span>
					<span>Home base</span>
					<span class="ml-3 size-3 rounded-full border-2 border-gold" aria-hidden="true"></span>
					<span><?= esc_html( "{$b['radiusMiles']}-mile range" ) ?></span>
				</div>
				<?=
				gm_button(
					'See all service areas',
					gm_url( '/service-areas' ),
					array(
						'variant' => 'outline',
						'arrow'   => true,
						'class'   => 'mt-8',
					)
				)
				?>
				<p class="mt-7 text-[0.82rem] leading-relaxed text-muted">Also serving <?= esc_html( implode( ', ', array_slice( gm_content( 'additionalCommunities' ), 0, 4 ) ) ) ?> and nearby communities.</p>
			</div>
			<div class="lg:col-span-8">
				<?php /* isolation + overflow keep Leaflet's pane z-indexes inside this box, under the fixed header. */ ?>
				<div class="glass-service-map relative isolate z-0 h-[23rem] overflow-hidden border border-charcoal/15 bg-[#e8f2f2] sm:h-[29rem]">
					<div data-service-map data-radius-miles="<?= (int) $b['radiusMiles'] ?>" class="size-full !z-0" role="region" aria-label="Interactive map showing Martinez Orlyn Glass &amp; Mirror coverage around Houston, Texas"></div>
					<p class="pointer-events-none absolute bottom-4 left-4 z-[1] bg-charcoal px-3 py-2 font-display text-[0.65rem] font-bold tracking-[0.12em] text-bone uppercase">Houston home base · glass &amp; mirror service area</p>
				</div>
				<div class="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-charcoal/15 pt-5 text-[0.86rem] text-charcoal">
					<?php foreach ( array_slice( gm_content( 'primaryAreaSlugs' ), 0, 6 ) as $slug ) : ?>
						<a href="<?= esc_url( gm_url( "/service-areas/$slug" ) ) ?>" class="transition-colors hover:text-forest"><?= esc_html( gm_area( $slug )['city'] ) ?></a>
					<?php endforeach; ?>
				</div>
			</div>
		</div>
	</section>

	<section class="bg-bone py-20 sm:py-28 lg:py-32">
		<div class="<?= gm_container() ?> grid gap-12 lg:grid-cols-12 lg:gap-16">
			<div class="lg:col-span-4">
				<div<?= gm_reveal() ?>><p class="eyebrow-line text-forest">Questions, answered</p></div>
				<div<?= gm_reveal( 'up', 70 ) ?>><h2 class="home-h2 mt-6 text-charcoal">Before you book the job.</h2></div>
			</div>
			<div class="lg:col-span-7 lg:col-start-6">
				<?php foreach ( gm_home_faqs() as $i => $faq ) : ?>
					<div<?= gm_reveal( 'up', $i * 50 ) ?>>
						<details class="group border-t border-charcoal/15 py-5 last:border-b">
							<summary class="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-[1.05rem] font-bold tracking-tight text-charcoal [&::-webkit-details-marker]:hidden">
								<?= esc_html( $faq['question'] ) ?>
								<span class="text-2xl font-normal leading-none text-gold transition-transform group-open:rotate-45">+</span>
							</summary>
							<p class="measure mt-4 text-[0.96rem] leading-relaxed text-muted"><?= esc_html( $faq['answer'] ) ?></p>
						</details>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
	</section>

	<section id="final-cta" class="bg-charcoal py-20 text-bone sm:py-24 lg:py-28">
		<div class="<?= gm_container() ?> grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
			<div<?= gm_reveal( 'scale' ) ?> class="relative min-h-[15rem] overflow-hidden lg:col-span-4">
				<?= gm_img( gm_photo( 'mirrorInstallAlt' ), 'object-cover', array( 'fill' => true ) ) ?>
				<div class="absolute inset-0 bg-charcoal/30" aria-hidden="true"></div>
			</div>
			<div class="lg:col-span-7 lg:col-start-6">
				<div<?= gm_reveal() ?>><p class="eyebrow-line text-gold"><?= esc_html( gm_cta( 'estimate' ) ) ?> · Houston, TX</p></div>
				<div<?= gm_reveal( 'up', 70 ) ?>><h2 class="home-h2 mt-6 max-w-[38rem] text-bone">Make the space clearer.</h2></div>
				<div<?= gm_reveal( 'up', 130 ) ?>>
					<p class="mt-5 max-w-[35rem] text-[1rem] leading-relaxed text-bone/72">Tell us what glass or mirror work you need. We will help you decide the next move and give you a clear way to start.</p>
				</div>
				<div<?= gm_reveal( 'up', 180 ) ?>>
					<div class="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
						<?= $estimate_button( 'home_final_cta', 'lg' ) ?>
						<a href="<?= esc_attr( gm_tel() ) ?>" data-cta="phone" data-location="home_final_cta" class="inline-flex items-center gap-3 font-display text-[1.05rem] font-bold text-bone transition-colors hover:text-gold">
							<?= gm_icon( 'phone', 'size-4 text-gold', 2.4 ) ?>
							<?= esc_html( $b['phone'] ) ?>
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>
<?php
get_footer();
