<?php
/**
 * Closing CTA with the contact details spelled out beside it
 * (components/sections/ContactCTA). Every value is a real link.
 *
 * @var array $args { title?: HTML, lead?: text, location?: tracking suffix }
 */

defined( 'ABSPATH' ) || exit;

$b        = gm_business();
$location = $args['location'] ?? 'contact_cta';
$cities   = array();
foreach ( array_slice( gm_content( 'primaryAreaSlugs' ), 0, 6 ) as $slug ) {
	$cities[] = gm_area( $slug )['city'];
}

$row = function ( $icon, $label, $value, $href = '', $cta = '', $note = false ) use ( $location ) {
	$value = $href
		? '<a href="' . esc_attr( $href ) . '" data-cta="' . esc_attr( $cta ) . '" data-location="' . esc_attr( $location ) . '" class="link-underline transition-colors hover:text-forest">' . esc_html( $value ) . '</a>'
		: esc_html( $value );
	return '<div class="flex items-start gap-4"><span aria-hidden="true" class="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center bg-forest/10">' . gm_icon( $icon, 'size-[1.15rem] text-forest' ) . '</span>'
		. '<div class="min-w-0"><dt class="text-[0.82rem] leading-snug text-muted">' . esc_html( $label ) . '</dt>'
		. '<dd class="' . ( $note ? 'mt-1.5 text-[0.9rem] leading-relaxed text-charcoal' : 'mt-1 font-display text-[1.02rem] leading-snug font-bold tracking-[-0.015em] break-words text-charcoal' ) . '">' . $value . '</dd></div></div>';
};
?>
<section class="<?= gm_space( 'loose' ) ?> relative isolate overflow-hidden bg-charcoal" aria-labelledby="contact-cta-heading">
	<div aria-hidden="true" class="glass-facet pointer-events-none absolute -top-72 -left-48 size-[54rem] text-bone/[0.045]"></div>
	<div aria-hidden="true" class="grain pointer-events-none absolute inset-0"></div>
	<div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent"></div>

	<div class="<?= gm_container() ?> relative z-10">
		<div class="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
			<div class="min-w-0 lg:col-span-6">
				<div<?= gm_reveal() ?>>
					<p class="inline-flex items-center gap-2.5 border border-bone/20 px-4 py-2 font-display text-[0.68rem] font-extrabold tracking-[0.16em] text-bone/85 uppercase">
						<?= gm_icon( 'shield-check', 'size-4 shrink-0 text-gold', 2.2 ) ?>
						<?= esc_html( "{$b['experience']} of experience" ) ?>
					</p>
				</div>

				<div<?= gm_reveal( 'up', 70 ) ?>>
					<h2 id="contact-cta-heading" class="home-h2 mt-7 max-w-[15ch] text-bone"><?= wp_kses_post( $args['title'] ?? 'Ready for glass work? <span class="text-gold">Let us come measure.</span>' ) ?></h2>
				</div>

				<div<?= gm_reveal( 'up', 130 ) ?>>
					<p class="mt-7 max-w-[52ch] text-[1.02rem] leading-relaxed text-bone/72"><?= esc_html( $args['lead'] ?? 'Tell us what you need — a shower enclosure, a mirrored wall, window glass or reglazing. We measure the opening, explain the work and help you schedule an appointment.' ) ?></p>
				</div>

				<div<?= gm_reveal( 'up', 180 ) ?>>
					<ul class="mt-8 flex flex-wrap gap-x-7 gap-y-3">
						<?php foreach ( array( 'Licensed & insured', 'By appointment', 'Residential & commercial' ) as $item ) : ?>
							<li class="inline-flex items-center gap-2.5 text-[0.9rem] text-bone/85">
								<span aria-hidden="true" class="inline-flex size-5 shrink-0 items-center justify-center border border-gold/40 bg-gold/10"><?= gm_icon( 'plus', 'size-3 text-gold', 3 ) ?></span>
								<?= esc_html( $item ) ?>
							</li>
						<?php endforeach; ?>
					</ul>
				</div>

				<div<?= gm_reveal( 'up', 230 ) ?>>
					<div class="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
						<?php /* "Call" stays in the accessible name but out of the layout, so the button fits a 375px screen. */ ?>
						<?=
						gm_button(
							'<span class="inline-flex items-center gap-2.5">' . gm_icon( 'phone', 'size-4 shrink-0', 2.6 ) . '<span class="sr-only">Call </span>' . esc_html( $b['phone'] ) . '</span>',
							gm_tel(),
							array(
								'size'  => 'lg',
								'attrs' => array(
									'data-cta'      => 'phone',
									'data-location' => $location,
								),
							)
						)
						?>
						<?=
						gm_button(
							esc_html( gm_cta( 'estimateShort' ) ),
							gm_url( '/contact' ),
							array(
								'variant' => 'onDark',
								'size'    => 'lg',
								'arrow'   => true,
								'attrs'   => array(
									'data-cta'      => 'estimate',
									'data-location' => $location,
								),
							)
						)
						?>
					</div>
				</div>
			</div>

			<div<?= gm_reveal( 'left', 140 ) ?> class="min-w-0 lg:col-span-5 lg:col-start-8">
				<div class="bg-bone p-2">
					<div class="h-full border border-charcoal/12 p-7 sm:p-9">
						<p class="font-display text-[1.35rem] font-extrabold tracking-[-0.03em] text-charcoal">Quick contact</p>
						<span aria-hidden="true" class="mt-5 block h-px w-10 bg-forest"></span>

						<dl class="mt-7 space-y-6">
							<?= $row( 'phone', 'Need glass or mirror work?', $b['phone'], gm_tel(), 'phone' ) ?>
							<?= $row( 'mail', 'Send us the details', $b['email'], "mailto:{$b['email']}", 'email' ) ?>
							<?= $row( 'clock', 'When we answer', $b['hoursLabel'] ) ?>
							<?= $row( 'map-pin', 'Where we work', implode( ', ', $cities ) . " and nearby communities {$b['radiusLabel']}.", '', '', true ) ?>
						</dl>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
