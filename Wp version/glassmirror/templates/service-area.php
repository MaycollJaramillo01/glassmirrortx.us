<?php
/**
 * /service-areas/{slug} (app/service-areas/[slug]/page.tsx).
 */

defined( 'ABSPATH' ) || exit;

$b    = gm_business();
$area = gm_route()['item'];

get_header();
?>
<section class="relative isolate overflow-hidden bg-charcoal pb-20 pt-32 text-bone sm:pb-28 sm:pt-40">
	<div class="absolute inset-0 lg:left-[50%]">
		<?=
		gm_img(
			gm_photo( 'heroGlass' ),
			'object-cover opacity-65',
			array(
				'fill'     => true,
				'priority' => true,
			)
		)
		?>
		<div aria-hidden="true" class="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/75 to-transparent"></div>
	</div>

	<div class="<?= gm_container( 'wide' ) ?> relative z-10">
		<a href="<?= esc_url( gm_url( '/service-areas' ) ) ?>" class="inline-flex items-center gap-2 text-[0.75rem] font-bold tracking-[0.12em] text-bone/60 uppercase hover:text-gold">
			<?= gm_icon( 'arrow-right', 'size-4 rotate-180', 2.3 ) ?> All service areas
		</a>
		<div class="mt-10 max-w-[43rem]">
			<p class="eyebrow-line text-gold"><?= esc_html( $area['eyebrow'] ) ?></p>
			<h1 class="home-h2 mt-7 text-bone"><?= esc_html( $area['h1'] ) ?></h1>
			<p class="mt-6 text-[1.05rem] leading-relaxed text-bone/72"><?= esc_html( $area['intro'] ) ?></p>
			<div class="mt-8 flex flex-wrap gap-4">
				<?=
				gm_button(
					esc_html( gm_cta( 'estimate' ) ),
					gm_url( '/contact' ),
					array(
						'arrow' => true,
						'attrs' => array(
							'data-cta'      => 'estimate',
							'data-location' => 'service_area_hero',
						),
					)
				)
				?>
				<a href="<?= esc_attr( gm_tel() ) ?>" data-cta="phone" data-location="service_area_hero" class="inline-flex min-h-[44px] items-center gap-2 px-1 font-display text-[0.9rem] font-bold text-bone hover:text-gold">
					<?= gm_icon( 'phone', 'size-4 text-gold', 2.4 ) ?> <?= esc_html( $b['phone'] ) ?>
				</a>
			</div>
		</div>
	</div>
</section>

<section class="bg-bone py-20 sm:py-28">
	<div class="<?= gm_container() ?> grid gap-12 lg:grid-cols-12 lg:gap-16">
		<div class="lg:col-span-4">
			<p class="eyebrow-line text-forest"><?= esc_html( $area['context']['heading'] ) ?></p>
			<h2 class="home-h2 mt-6 text-charcoal">The local conditions change the job.</h2>
		</div>
		<div class="space-y-5 lg:col-span-7 lg:col-start-6">
			<?php foreach ( $area['context']['paragraphs'] as $paragraph ) : ?>
				<p class="text-[1rem] leading-relaxed text-muted"><?= esc_html( $paragraph ) ?></p>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<section class="bg-sand py-20 sm:py-28">
	<div class="<?= gm_container() ?>">
		<p class="eyebrow-line text-forest">Common calls in <?= esc_html( $area['city'] ) ?></p>
		<div class="mt-8 grid gap-0 border-t border-charcoal/15 sm:grid-cols-2 lg:grid-cols-4">
			<?php foreach ( $area['featuredServices'] as $featured ) : ?>
				<div class="border-b border-charcoal/15 py-6 sm:px-6 sm:first:pl-0 lg:border-r lg:last:border-r-0">
					<h3 class="font-display text-[1.1rem] font-extrabold tracking-tight text-charcoal">
						<a href="<?= esc_url( gm_url( "/services/{$featured['slug']}" ) ) ?>" class="capitalize transition-colors hover:text-forest"><?= esc_html( gm_service( $featured['slug'] )['name'] ) ?></a>
					</h3>
					<p class="mt-3 text-[0.9rem] leading-relaxed text-muted"><?= esc_html( $featured['note'] ) ?></p>
				</div>
			<?php endforeach; ?>
		</div>
		<ul class="mt-10 grid gap-3 sm:grid-cols-2">
			<li class="flex items-start gap-3 text-[0.92rem] text-charcoal"><?= gm_icon( 'plus', 'mt-0.5 size-4 shrink-0 text-gold', 3 ) ?> Appointments by request</li>
			<li class="flex items-start gap-3 text-[0.92rem] text-charcoal"><?= gm_icon( 'plus', 'mt-0.5 size-4 shrink-0 text-gold', 3 ) ?> Licensed &amp; insured</li>
		</ul>
	</div>
</section>

<section class="bg-bone py-20 sm:py-28" aria-labelledby="area-faq-heading">
	<div class="<?= gm_container() ?> grid gap-12 lg:grid-cols-12 lg:gap-16">
		<div class="lg:col-span-4">
			<p class="eyebrow-line text-forest">Local questions</p>
			<h2 id="area-faq-heading" class="home-h2 mt-6 text-charcoal">Glass work in <?= esc_html( $area['city'] ) ?>, answered.</h2>
		</div>
		<div class="lg:col-span-7 lg:col-start-6">
			<?php foreach ( $area['faq'] as $faq ) : ?>
				<details class="group border-t border-charcoal/15 py-5 last:border-b">
					<summary class="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-[1.05rem] font-bold tracking-tight text-charcoal [&::-webkit-details-marker]:hidden">
						<?= esc_html( $faq['question'] ) ?>
						<span class="text-2xl font-normal leading-none text-gold transition-transform group-open:rotate-45">+</span>
					</summary>
					<p class="measure mt-4 text-[0.96rem] leading-relaxed text-muted"><?= esc_html( $faq['answer'] ) ?></p>
				</details>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<section class="bg-gold py-16 sm:py-20">
	<div class="<?= gm_container() ?> flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
		<div>
			<p class="font-display text-2xl font-extrabold tracking-tight text-charcoal">Need glass or mirror work in <?= esc_html( $area['city'] ) ?>?</p>
			<p class="mt-2 text-[0.94rem] text-charcoal/70">Tell us what you need and we will help you schedule the job.</p>
		</div>
		<?=
		gm_button(
			esc_html( gm_cta( 'estimate' ) ),
			gm_url( '/contact' ),
			array(
				'variant' => 'secondary',
				'arrow'   => true,
				'attrs'   => array(
					'data-cta'      => 'estimate',
					'data-location' => 'service_area_cta',
				),
			)
		)
		?>
	</div>
</section>
<?php
get_footer();
