<?php
/**
 * Site footer, mobile conversion bar and contact bubbles
 * (components/layout/Footer, MobileStickyCTA, ContactBubbles).
 */

defined( 'ABSPATH' ) || exit;

$b           = gm_business();
$footer_link = function ( $path, $label ) {
	return '<li><a href="' . esc_url( gm_url( $path ) ) . '" class="link-underline text-bone/70 transition-colors hover:text-bone">' . esc_html( $label ) . '</a></li>';
};

// A channel with no link configured does not render.
$bubbles = array_filter(
	array(
		array( gm_url( '/contact#appointment-form' ), 'message', 'Send a message and photos', gm_icon( 'message-square-text', 'size-5', 2.4 ), 'bg-gold text-charcoal hover:bg-gold-bright', false, true ),
		array( $b['whatsapp'] ?? '', 'whatsapp', 'Chat on WhatsApp', gm_brand_icon( 'whatsapp', 'size-6' ), 'bg-[#25D366] text-white hover:bg-[#1ebe5b]', true, true ),
		array( $b['messenger'] ?? '', 'messenger', 'Chat on Messenger', gm_brand_icon( 'messenger', 'size-6' ), 'bg-[#0084FF] text-white hover:bg-[#0072db]', true, false ),
		array( gm_tel(), 'phone', "Call {$b['phone']}", gm_icon( 'phone', 'size-5', 2.6 ), 'bg-forest text-bone hover:bg-forest-soft', false, false ),
	),
	function ( $bubble ) {
		return '' !== $bubble[0];
	}
);
?>
</main>

<footer class="relative overflow-hidden bg-charcoal text-bone">
	<?php /* Soft glass-facet motif — pane lattice, not an illustration. */ ?>
	<div aria-hidden="true" class="glass-facet pointer-events-none absolute -top-24 -right-20 size-[30rem] text-bone/[0.04]"></div>

	<div class="<?= gm_container() ?> relative">
		<div class="grid gap-12 py-16 md:py-20 lg:grid-cols-4 lg:gap-10">
			<div>
				<?= gm_logo() ?>
				<p class="measure mt-6 text-[0.95rem] leading-relaxed text-bone/65">
					Custom shower enclosures, mirrors, windows and glass repair for residential and
					commercial customers across Houston, Texas and surrounding communities.
				</p>

				<ul class="mt-7 space-y-2.5 text-[0.9rem]">
					<li class="flex items-center gap-2.5 text-bone/70">
						<?= gm_icon( 'map-pin', 'size-4 shrink-0 text-gold' ) ?>
						<a href="<?= esc_url( $b['googleMaps'] ) ?>" target="_blank" rel="noopener noreferrer" class="transition-colors hover:text-gold"><?= esc_html( $b['addressLine'] ) ?></a>
					</li>
					<li class="flex items-center gap-2.5 text-bone/70">
						<?= gm_icon( 'clock', 'size-4 shrink-0 text-gold' ) ?>
						<?= esc_html( $b['hoursLabel'] ) ?>
					</li>
					<li class="flex items-center gap-2.5 text-bone/70">
						<?= gm_icon( 'phone', 'size-4 shrink-0 text-gold' ) ?>
						<a href="<?= esc_attr( gm_tel() ) ?>" class="transition-colors hover:text-gold"><?= esc_html( $b['phone'] ) ?></a>
					</li>
					<li class="flex items-center gap-2.5 text-bone/70">
						<?= gm_icon( 'mail', 'size-4 shrink-0 text-gold' ) ?>
						<a href="mailto:<?= esc_attr( $b['email'] ) ?>" class="transition-colors hover:text-gold"><?= esc_html( $b['email'] ) ?></a>
					</li>
				</ul>

				<?php if ( ! empty( $b['social']['facebook'] ) ) : ?>
					<div class="mt-7">
						<p class="text-[0.72rem] font-bold tracking-[0.14em] text-bone/45 uppercase">Follow the work</p>
						<ul class="mt-3.5 flex gap-2.5">
							<li>
								<a href="<?= esc_url( $b['social']['facebook'] ) ?>" aria-label="<?= esc_attr( "{$b['name']} on Facebook" ) ?>" rel="noopener noreferrer" target="_blank" class="flex size-10 items-center justify-center border border-bone/20 text-bone/70 transition-colors hover:border-gold hover:bg-gold hover:text-charcoal">
									<?= gm_brand_icon( 'facebook', 'size-[1.15rem]' ) ?>
								</a>
							</li>
						</ul>
					</div>
				<?php endif; ?>
			</div>

			<nav aria-labelledby="footer-company">
				<h2 id="footer-company" class="t-eyebrow mb-5 text-gold">Company</h2>
				<ul class="space-y-2.5 text-[0.92rem]">
					<?= $footer_link( '/', 'Home' ) ?>
					<?= $footer_link( '/about', 'About' ) ?>
					<?= $footer_link( '/services', 'Services' ) ?>
					<?= $footer_link( '/service-areas', 'Service Areas' ) ?>
					<?= $footer_link( '/gallery', 'Gallery' ) ?>
					<?= $footer_link( '/contact', 'Contact' ) ?>
					<?= $footer_link( '/privacy-policy', 'Privacy Policy' ) ?>
				</ul>
			</nav>

			<nav aria-labelledby="footer-services">
				<h2 id="footer-services" class="t-eyebrow mb-5 text-gold">Services</h2>
				<ul class="space-y-2.5 text-[0.92rem]">
					<?php foreach ( gm_content( 'footerServiceSlugs' ) as $slug ) : ?>
						<?= $footer_link( "/services/$slug", gm_service( $slug )['name'] ) ?>
					<?php endforeach; ?>
				</ul>
			</nav>

			<div>
				<h2 class="t-eyebrow mb-5 text-gold">Service Areas</h2>
				<ul class="mb-8 grid w-fit grid-cols-2 gap-x-8 gap-y-2.5 text-[0.92rem]">
					<?php foreach ( gm_content( 'footerAreaSlugs' ) as $slug ) : ?>
						<?= $footer_link( "/service-areas/$slug", gm_area( $slug )['city'] ) ?>
					<?php endforeach; ?>
				</ul>

				<h2 class="t-eyebrow mb-4 text-gold">Contact</h2>
				<ul class="space-y-3">
					<li>
						<a href="<?= esc_attr( gm_tel() ) ?>" data-cta="phone" data-location="footer" class="inline-flex items-center gap-2.5 font-display text-xl font-extrabold tracking-tight text-bone transition-colors hover:text-gold">
							<?= gm_icon( 'phone', 'size-4 shrink-0 text-gold', 2.5 ) ?>
							<?= esc_html( $b['phone'] ) ?>
						</a>
					</li>
					<li>
						<a href="mailto:<?= esc_attr( $b['email'] ) ?>" data-cta="email" data-location="footer" class="inline-flex items-start gap-2.5 text-[0.88rem] break-all text-bone/70 transition-colors hover:text-bone">
							<?= gm_icon( 'mail', 'mt-0.5 size-4 shrink-0 text-gold' ) ?>
							<?= esc_html( $b['email'] ) ?>
						</a>
					</li>
				</ul>
			</div>
		</div>

		<div class="flex flex-col gap-3 border-t border-charcoal-line py-7 text-[0.8rem] text-bone/45 md:flex-row md:items-center md:justify-between">
			<p>© <?= esc_html( gmdate( 'Y' ) . ' ' . $b['legalName'] ) ?>. All Rights Reserved.</p>
			<p>Serving Houston, TX and surrounding communities — <?= esc_html( $b['radiusLabel'] ) ?>.</p>
		</div>
	</div>
</footer>

<?php /* Mobile conversion bar. The contact page is the form itself, so it skips the bar. */ ?>
<?php if ( 'contact' !== gm_route_name() ) : ?>
	<nav aria-label="Quick actions" class="safe-bottom fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-charcoal-line bg-charcoal/97 backdrop-blur-md lg:hidden">
		<a href="<?= esc_attr( gm_tel() ) ?>" data-cta="phone" data-location="sticky_bar" class="flex min-h-[58px] flex-col items-center justify-center gap-1 border-r border-charcoal-line text-bone transition-colors active:bg-charcoal-soft">
			<?= gm_icon( 'phone', 'size-[18px] text-gold', 2.4 ) ?>
			<span class="font-display text-[0.66rem] font-bold tracking-[0.14em] uppercase">Call</span>
		</a>
		<a href="<?= esc_url( gm_url( '/contact' ) ) ?>" data-cta="estimate" data-location="sticky_bar" class="flex min-h-[58px] flex-col items-center justify-center gap-1 bg-gold text-charcoal transition-colors active:bg-gold-bright">
			<?= gm_icon( 'pencil-ruler', 'size-[18px]', 2.4 ) ?>
			<span class="font-display text-[0.66rem] font-bold tracking-[0.14em] uppercase"><?= esc_html( gm_cta( 'estimateShort' ) ) ?></span>
		</a>
		<a href="<?= esc_url( gm_url( '/services' ) ) ?>" class="flex min-h-[58px] flex-col items-center justify-center gap-1 border-l border-charcoal-line text-bone transition-colors active:bg-charcoal-soft">
			<?= gm_icon( 'layout-grid', 'size-[18px] text-gold', 2.4 ) ?>
			<span class="font-display text-[0.66rem] font-bold tracking-[0.14em] uppercase">Services</span>
		</a>
	</nav>
<?php endif; ?>

<?php /* Floating chat and call bubbles. On phones they sit above the conversion bar; Messenger and phone are desktop-only. */ ?>
<div class="safe-bottom fixed right-4 bottom-[70px] z-40 flex flex-col gap-3 lg:right-6 lg:bottom-6">
	<?php foreach ( $bubbles as list( $href, $key, $label, $icon, $class, $external, $mobile ) ) : ?>
		<a href="<?= esc_url( $href, array( 'http', 'https', 'tel' ) ) ?>" aria-label="<?= esc_attr( $label ) ?>" title="<?= esc_attr( $label ) ?>" data-cta="<?= esc_attr( $key ) ?>" data-location="contact_bubble"<?= $external ? ' target="_blank" rel="noopener noreferrer"' : '' ?> class="group size-12 items-center justify-center rounded-full shadow-[0_4px_14px_rgba(8,12,9,0.28)] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 lg:size-[52px] <?= $mobile ? 'flex' : 'hidden lg:flex' ?> <?= esc_attr( $class ) ?>">
			<?= $icon ?>
		</a>
	<?php endforeach; ?>
</div>

<?php wp_footer(); ?>
</body>
</html>
