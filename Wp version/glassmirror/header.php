<?php
/**
 * Document head and site header (components/layout/Header, ServicesMegaMenu, MobileNav).
 */

defined( 'ABSPATH' ) || exit;

$b     = gm_business();
$route = gm_route_name();
$links = array(
	array( '/', 'Home', array( 'home' ) ),
	array( '/about', 'About us', array( 'about' ) ),
	array( '/services', 'Services', array( 'services', 'service' ) ),
	array( '/gallery', 'Gallery', array( 'gallery' ) ),
	array( '/contact', 'Contact', array( 'contact' ) ),
);
$rail  = array(
	array( 'View all services', '/services' ),
	array( 'Our gallery', '/gallery' ),
	array( 'Get an appointment', '/contact' ),
);

$utility = function ( $icon, $label, $content ) {
	return '<li class="flex items-center gap-3"><span aria-hidden="true" class="flex size-8 shrink-0 items-center justify-center rounded-full bg-forest text-bone">'
		. gm_icon( $icon, 'size-4', 2.2 )
		. '</span><span class="leading-tight"><span class="block text-[0.72rem] text-bone/55">' . esc_html( $label ) . '</span><span class="block text-[0.82rem] font-semibold text-bone/90">' . $content . '</span></span></li>';
};
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<?php wp_head(); ?>
</head>
<body <?php body_class( 'min-h-dvh antialiased' ); ?>>
<?php wp_body_open(); ?>
<a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-gold focus:px-5 focus:py-3 focus:font-display focus:text-sm focus:font-bold focus:text-charcoal focus:uppercase">Skip to main content</a>

<header id="site-header" class="fixed inset-x-0 top-0 z-[100] border-b border-bone/10 bg-charcoal/94 text-bone backdrop-blur-md">
	<?php /* Utility bar. Desktop only — on phones this is already one tap away in the header and the sticky call bar. */ ?>
	<div class="hidden border-b border-bone/10 lg:block">
		<div class="<?= gm_container( 'wide' ) ?>">
			<div class="flex h-[46px] items-center justify-between gap-6">
				<ul class="flex min-w-0 items-center gap-6 xl:gap-8">
					<?= $utility( 'mail', 'Email', '<a href="mailto:' . esc_attr( $b['email'] ) . '" data-cta="email" data-location="header_bar" class="link-underline transition-colors hover:text-gold">' . esc_html( $b['email'] ) . '</a>' ) ?>
					<?= $utility( 'clock', 'Hours', esc_html( $b['hoursLabelShort'] ) ) ?>
					<?= $utility( 'phone', 'Call us', '<a href="' . esc_attr( gm_tel() ) . '" data-cta="phone" data-location="header_bar" class="link-underline whitespace-nowrap transition-colors hover:text-gold">' . esc_html( $b['phone'] ) . '</a>' ) ?>
				</ul>

				<a href="<?= esc_url( $b['googleMaps'] ) ?>" target="_blank" rel="noopener noreferrer" class="inline-flex max-w-[16rem] shrink-0 items-center gap-2 bg-forest px-3 py-1.5 font-display text-[0.68rem] font-bold tracking-[0.04em] text-bone transition-colors hover:bg-forest-soft xl:max-w-none xl:px-4 xl:text-[0.72rem] xl:tracking-[0.06em]">
					<?= gm_icon( 'map-pin', 'size-3.5 shrink-0', 2.4 ) ?>
					<span class="truncate"><?= esc_html( "{$b['streetAddress']}, {$b['city']}, {$b['stateCode']} {$b['zip']}" ) ?></span>
				</a>
			</div>
		</div>
	</div>

	<div class="<?= gm_container( 'wide' ) ?>">
		<div class="flex h-[72px] items-center justify-between gap-6">
			<?= gm_logo() ?>

			<nav aria-label="Main navigation" class="hidden lg:block">
				<ul class="flex items-center gap-7">
					<?php foreach ( $links as list( $href, $label, $routes ) ) : ?>
						<?php $active = in_array( $route, $routes, true ); ?>
						<?php if ( '/services' === $href ) : ?>
							<li>
								<?php /* Services has many entries, so it gets the mega menu: opens on hover and focus, closes on Escape, outside click and pointer leave. */ ?>
								<div class="static" data-mega>
									<a href="<?= esc_url( gm_url( '/services' ) ) ?>" aria-expanded="false" data-mega-trigger<?= $active ? ' data-active' : '' ?> class="inline-flex items-center gap-1.5 font-display text-[0.72rem] font-bold tracking-[0.12em] uppercase transition-colors <?= $active ? 'text-gold' : 'text-bone/72 hover:text-bone' ?>">
										Services
										<?= gm_icon( 'chevron-down', 'size-3.5 transition-transform', 2.4 ) ?>
									</a>

									<div hidden data-mega-panel class="absolute inset-x-0 top-full border-t border-bone/10 bg-charcoal/98 text-bone shadow-[0_24px_48px_rgba(8,12,9,0.45)] backdrop-blur-md">
										<div class="<?= gm_container( 'wide' ) ?> grid max-h-[calc(100dvh-var(--header-h,120px))] gap-10 overflow-y-auto py-9 lg:grid-cols-12 lg:gap-14">
											<div class="lg:col-span-9">
												<p class="text-[0.68rem] font-bold tracking-[0.18em] text-bone/45 uppercase">Solutions &amp; services</p>
												<div class="mt-6 grid gap-x-12 gap-y-8 border-t border-bone/10 pt-7 md:grid-cols-2">
													<?php foreach ( gm_service_groups() as $entry ) : ?>
														<div>
															<p class="font-display text-[0.72rem] font-extrabold tracking-[0.14em] text-gold uppercase"><?= esc_html( $entry['group']['name'] ) ?></p>
															<ul class="mt-3.5">
																<?php foreach ( $entry['items'] as $service ) : ?>
																	<li>
																		<a href="<?= esc_url( gm_url( "/services/{$service['slug']}" ) ) ?>" class="group flex items-center gap-3 py-[7px] font-display text-[0.92rem] font-bold tracking-[-0.01em] text-bone/85 transition-colors hover:text-gold">
																			<span aria-hidden="true" class="h-px w-0 bg-gold transition-all duration-200 group-hover:w-4"></span>
																			<?= esc_html( $service['name'] ) ?>
																		</a>
																	</li>
																<?php endforeach; ?>
															</ul>
														</div>
													<?php endforeach; ?>
												</div>
											</div>

											<div class="lg:col-span-3">
												<ul class="space-y-1 lg:border-l lg:border-bone/10 lg:pl-10">
													<?php foreach ( $rail as list( $rail_label, $rail_href ) ) : ?>
														<li class="border-b border-bone/10 last:border-b-0">
															<a href="<?= esc_url( gm_url( $rail_href ) ) ?>" class="group flex items-center justify-between gap-4 py-4 font-display text-[0.95rem] font-bold tracking-[-0.01em] text-bone transition-colors hover:text-gold">
																<?= esc_html( $rail_label ) ?>
																<?= gm_icon( 'arrow-right', 'arrow-shift size-4 shrink-0', 2.2 ) ?>
															</a>
														</li>
													<?php endforeach; ?>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</li>
						<?php else : ?>
							<li>
								<a href="<?= esc_url( gm_url( $href ) ) ?>" class="font-display text-[0.72rem] font-bold tracking-[0.12em] uppercase transition-colors <?= $active ? 'text-gold' : 'text-bone/72 hover:text-bone' ?>"<?= $active ? ' aria-current="page"' : '' ?>><?= esc_html( $label ) ?></a>
							</li>
						<?php endif; ?>
					<?php endforeach; ?>
				</ul>
			</nav>

			<div class="hidden items-center gap-5 lg:flex">
				<a href="<?= esc_attr( gm_tel() ) ?>" data-cta="phone" data-location="header" class="inline-flex items-center gap-2 text-[0.9rem] font-semibold text-bone/80 transition-colors hover:text-gold">
					<?= gm_icon( 'phone', 'size-4 text-gold', 2.4 ) ?>
					<?= esc_html( $b['phone'] ) ?>
				</a>
				<a href="<?= esc_url( gm_url( '/contact' ) ) ?>" data-cta="estimate" data-location="header" class="inline-flex min-h-[42px] items-center bg-gold px-5 py-3 font-display text-[0.7rem] font-extrabold tracking-[0.1em] text-charcoal uppercase transition-colors hover:bg-gold-bright active:bg-gold-deep"><?= esc_html( gm_cta( 'estimateShort' ) ) ?></a>
			</div>

			<div class="flex items-center gap-2 lg:hidden">
				<a href="<?= esc_attr( gm_tel() ) ?>" data-cta="phone" data-location="header_mobile" aria-label="<?= esc_attr( "Call {$b['phone']}" ) ?>" class="flex size-11 items-center justify-center text-gold transition-colors hover:text-bone">
					<?= gm_icon( 'phone', 'size-[21px]', 2.4 ) ?>
				</a>
				<button type="button" data-menu-open aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav" class="flex size-11 items-center justify-center text-bone transition-colors hover:text-gold">
					<?= gm_icon( 'menu', 'size-6', 2.2 ) ?>
				</button>
			</div>
		</div>
	</div>
</header>

<?php /* Above the fixed header (z-[100]); the drawer has its own close bar. */ ?>
<div id="mobile-nav" data-mobile-nav aria-hidden="true" class="fixed inset-0 z-[110] overflow-y-auto bg-charcoal text-bone transition-[opacity,visibility] duration-300 lg:hidden invisible opacity-0">
	<div class="<?= gm_container( 'wide' ) ?> flex min-h-full flex-col py-5">
		<div class="flex items-center justify-between">
			<span class="font-display text-[0.7rem] font-bold tracking-[0.16em] text-gold uppercase">Navigation</span>
			<button type="button" data-menu-close aria-label="Close menu" class="flex size-11 items-center justify-center text-bone hover:text-gold">
				<?= gm_icon( 'x', 'size-6', 2 ) ?>
			</button>
		</div>

		<nav aria-label="Mobile navigation" class="mt-12">
			<ul class="divide-y divide-bone/12 border-y border-bone/12">
				<?php foreach ( $links as list( $href, $label ) ) : ?>
					<?php if ( '/services' === $href ) : ?>
						<?php /* Services expands in place instead of being a dead end at the hub page. */ ?>
						<li>
							<button type="button" data-services-toggle aria-expanded="false" aria-controls="mobile-services" class="flex w-full items-center justify-between py-5 font-display text-[1.55rem] font-extrabold tracking-[-0.035em] text-bone transition-colors hover:text-gold">
								<?= esc_html( $label ) ?>
								<?= gm_icon( 'chevron-down', 'size-6 shrink-0 text-gold transition-transform duration-200', 2 ) ?>
							</button>

							<div id="mobile-services" hidden class="pb-6">
								<a href="<?= esc_url( gm_url( '/services' ) ) ?>" class="mb-5 inline-flex items-center gap-2 font-display text-[0.72rem] font-bold tracking-[0.14em] text-gold uppercase">
									View all services
									<?= gm_icon( 'arrow-right', 'size-3.5', 2.4 ) ?>
								</a>

								<?php foreach ( gm_service_groups() as $entry ) : ?>
									<div class="mt-5 first:mt-0">
										<p class="font-display text-[0.68rem] font-extrabold tracking-[0.14em] text-bone/45 uppercase"><?= esc_html( $entry['group']['name'] ) ?></p>
										<ul class="mt-1">
											<?php foreach ( $entry['items'] as $service ) : ?>
												<li>
													<a href="<?= esc_url( gm_url( "/services/{$service['slug']}" ) ) ?>" class="flex min-h-[44px] items-center font-display text-[1.02rem] font-bold tracking-[-0.01em] text-bone/85 transition-colors hover:text-gold"><?= esc_html( $service['name'] ) ?></a>
												</li>
											<?php endforeach; ?>
										</ul>
									</div>
								<?php endforeach; ?>
							</div>
						</li>
					<?php else : ?>
						<li>
							<a href="<?= esc_url( gm_url( $href ) ) ?>" class="flex items-center justify-between py-5 font-display text-[1.55rem] font-extrabold tracking-[-0.035em] text-bone transition-colors hover:text-gold">
								<?= esc_html( $label ) ?>
								<?= gm_icon( 'arrow-right', 'size-5 text-gold', 2 ) ?>
							</a>
						</li>
					<?php endif; ?>
				<?php endforeach; ?>
			</ul>
		</nav>

		<div class="mt-auto border-t border-bone/12 pt-7">
			<p class="text-[0.82rem] text-bone/55">Need help now?</p>
			<a href="<?= esc_attr( gm_tel() ) ?>" data-cta="phone" data-location="mobile_menu" class="mt-3 flex items-center gap-3 font-display text-[1.25rem] font-extrabold text-bone hover:text-gold">
				<?= gm_icon( 'phone', 'size-5 text-gold', 2.3 ) ?>
				<?= esc_html( $b['phone'] ) ?>
			</a>
			<a href="<?= esc_url( gm_url( '/contact' ) ) ?>" class="mt-6 inline-flex min-h-[48px] items-center gap-3 bg-gold px-5 py-3 font-display text-[0.72rem] font-extrabold tracking-[0.1em] text-charcoal uppercase hover:bg-gold-bright">
				<?= esc_html( gm_cta( 'estimate' ) ) ?>
				<?= gm_icon( 'arrow-right', 'size-4', 2.3 ) ?>
			</a>
		</div>
	</div>
</div>

<?php /* Padding for the mobile conversion bar so it never covers content. */ ?>
<main id="main" class="pb-[58px] lg:pb-0">
