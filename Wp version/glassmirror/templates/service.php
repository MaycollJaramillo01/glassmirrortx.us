<?php
/**
 * /services/{slug} (app/services/[slug]/page.tsx + components/services/*).
 */

defined( 'ABSPATH' ) || exit;

$b       = gm_business();
$service = gm_route()['item'];
$name    = $service['name'];
$lower   = strtolower( $name );
$image   = $service['heroImage'];
$trust   = array( $b['experienceLabel'], 'Licensed & Insured', 'By Appointment', 'Residential & Commercial' );
$related = array_filter( array_map( 'gm_service', $service['related'] ) );
$reasons = array(
	array( 'Years', 'Hands-On Experience' ),
	array( 'Licensed', "License {$b['license']}" ),
	array( 'Custom', 'Fabrication & Install' ),
	array( 'Insured', 'Company Coverage' ),
);
$points  = array(
	'Family-owned glass and mirror shop serving Houston and nearby cities',
	'Custom shower enclosures, mirrors, windows and reglazing measured to the opening',
	'Residential and commercial work, from a single pane to a full mirrored wall',
	'Clear scheduling, careful install and a clean finish when the job is done',
);

get_header();
?>

<section class="relative isolate overflow-hidden bg-charcoal">
	<div aria-hidden="true" class="glass-facet pointer-events-none absolute -top-40 -right-24 size-[44rem] text-bone/[0.05]"></div>

	<div class="<?= gm_container( 'wide' ) ?> relative z-10 pt-32 pb-16 md:pt-40 md:pb-24 lg:pb-28">
		<?php get_template_part( 'template-parts/breadcrumbs', null, array( 'trail' => gm_seo()['trail'] ) ); ?>

		<div class="grid lg:grid-cols-12">
			<div class="min-w-0 max-w-4xl lg:col-span-9">
				<p class="t-eyebrow flex items-center gap-3 text-gold">
					<span aria-hidden="true" class="h-px w-8 bg-gold/60"></span>
					<?= esc_html( $service['eyebrow'] ) ?>
				</p>

				<h1 class="mt-6 text-bone <?= 'typographic' === $service['heroVariant'] ? 't-display' : 't-h1' ?>"><?= esc_html( $service['h1'] ) ?></h1>

				<p class="mt-7 max-w-2xl text-[1.02rem] leading-relaxed text-bone/80 sm:text-[1.0625rem]"><?= esc_html( $service['intro'] ) ?></p>

				<div class="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-stretch">
					<?=
					gm_button(
						esc_html( gm_cta( 'estimate' ) ),
						gm_url( '/contact' ),
						array(
							'size'  => 'lg',
							'arrow' => true,
							'class' => 'shrink-0',
							'attrs' => array(
								'data-cta'      => 'estimate',
								'data-location' => 'service_hero',
							),
						)
					)
					?>
					<?=
					gm_button(
						'<span class="inline-flex items-center gap-2.5 whitespace-nowrap">' . gm_icon( 'phone', 'size-4 shrink-0 text-gold', 2.6 ) . esc_html( $b['phone'] ) . '</span>',
						gm_tel(),
						array(
							'variant' => 'onDark',
							'size'    => 'lg',
							'class'   => 'shrink-0',
							'attrs'   => array(
								'data-cta'      => 'phone',
								'data-location' => 'service_hero',
							),
						)
					)
					?>
				</div>

				<ul class="mt-10 flex flex-wrap gap-x-7 gap-y-2.5 border-t border-bone/15 pt-7">
					<?php foreach ( $trust as $item ) : ?>
						<li class="font-display text-[0.72rem] font-bold tracking-[0.12em] text-bone/70 uppercase"><?= esc_html( $item ) ?></li>
					<?php endforeach; ?>
				</ul>
			</div>
		</div>
	</div>
</section>

<?php /* "When you need this" checklist beside the photograph. */ ?>
<section class="<?= gm_space( 'tight' ) ?> bg-bone" aria-labelledby="signals-heading">
	<div class="<?= gm_container() ?>">
		<div class="grid gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-16">
			<div class="flex flex-col lg:col-span-5">
				<div<?= gm_reveal() ?>><?= gm_eyebrow( 'Is This Your Situation?' ) ?></div>
				<div<?= gm_reveal( 'up', 60 ) ?>>
					<h2 id="signals-heading" class="t-h3 mt-5 max-w-[20ch] text-charcoal"><?= esc_html( $service['signals']['heading'] ) ?></h2>
				</div>

				<?php if ( $image ) : ?>
					<div<?= gm_reveal( 'scale', 120 ) ?> class="mt-8 flex min-h-0 flex-1 flex-col">
						<figure class="relative min-h-[15rem] flex-1 overflow-hidden bg-sand max-lg:aspect-[4/3]">
							<?=
							gm_img(
								$image,
								'object-cover object-center',
								array(
									'fill'     => true,
									'priority' => true,
								)
							)
							?>
							<?php if ( empty( $image['stock'] ) ) : ?>
								<figcaption class="absolute right-0 bottom-0 left-0 bg-linear-to-t from-charcoal/90 to-transparent px-5 pt-12 pb-4 font-display text-[0.68rem] font-bold tracking-[0.14em] text-bone uppercase"><?= esc_html( $name ) ?> · Houston, TX</figcaption>
							<?php endif; ?>
						</figure>
					</div>
				<?php endif; ?>
			</div>

			<div class="lg:col-span-6 lg:col-start-7">
				<ul class="border-t border-charcoal/12">
					<?php foreach ( $service['signals']['items'] as $i => $item ) : ?>
						<li<?= gm_reveal( 'up', $i * 60 ) ?> class="flex gap-6 border-b border-charcoal/12 py-5">
							<span class="w-6 shrink-0 pt-1 font-display text-[0.72rem] font-bold text-forest tabular-nums"><?= gm_pad( $i + 1 ) ?></span>
							<span class="text-[1rem] leading-relaxed text-charcoal"><?= esc_html( $item ) ?></span>
						</li>
					<?php endforeach; ?>
				</ul>
			</div>
		</div>
	</div>
</section>

<?php /* Direct answer block; the same words are emitted as FAQPage schema. */ ?>
<section class="<?= gm_space( 'tight' ) ?> bg-white" aria-labelledby="answer-heading">
	<div class="<?= gm_container() ?>">
		<div class="grid gap-10 lg:grid-cols-12 lg:gap-16">
			<div class="lg:col-span-7">
				<div<?= gm_reveal() ?>>
					<h2 id="answer-heading" class="t-h3 text-charcoal"><?= esc_html( $service['aeo']['question'] ) ?></h2>
				</div>
				<div<?= gm_reveal( 'up', 70 ) ?>>
					<p class="mt-6 text-[1.05rem] leading-relaxed text-muted"><?= esc_html( $service['aeo']['answer'] ) ?></p>
				</div>
			</div>

			<div class="lg:col-span-4 lg:col-start-9">
				<dl class="divide-y divide-charcoal/12 border-y border-charcoal/12">
					<?php foreach ( $service['aeo']['facts'] as $i => $fact ) : ?>
						<div<?= gm_reveal( 'up', $i * 70 ) ?> class="flex gap-5 py-4">
							<dt class="w-[9rem] shrink-0 font-display text-[0.68rem] font-bold tracking-[0.14em] text-forest uppercase"><?= esc_html( $fact['label'] ) ?></dt>
							<dd class="text-[0.92rem] leading-relaxed text-charcoal"><?= esc_html( $fact['value'] ) ?></dd>
						</div>
					<?php endforeach; ?>
				</dl>
			</div>
		</div>
	</div>
</section>

<section class="<?= gm_space() ?> relative isolate overflow-hidden bg-forest" aria-labelledby="benefits-heading">
	<div aria-hidden="true" class="glass-facet pointer-events-none absolute -top-56 -right-40 size-[46rem] text-bone/[0.07]"></div>
	<div aria-hidden="true" class="grain pointer-events-none absolute inset-0"></div>

	<div class="<?= gm_container() ?> relative z-10">
		<div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
			<div class="lg:col-span-4">
				<div<?= gm_reveal() ?>><?= gm_eyebrow( 'What You Get', 'light' ) ?></div>
				<div<?= gm_reveal( 'up', 60 ) ?>>
					<h2 id="benefits-heading" class="home-h2 mt-6 max-w-[12ch] text-bone">How the job is done</h2>
				</div>
			</div>

			<ul class="grid gap-x-12 gap-y-11 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
				<?php foreach ( $service['benefits'] as $i => $benefit ) : ?>
					<li<?= gm_reveal( 'up', $i * 80 ) ?> class="border-t border-bone/20 pt-6">
						<span class="font-display text-[1.9rem] leading-none font-extrabold tracking-[-0.04em] text-bone/30 tabular-nums"><?= gm_pad( $i + 1 ) ?></span>
						<h3 class="mt-4 max-w-[22ch] font-display text-[1.02rem] leading-tight font-extrabold tracking-[0.01em] text-bone uppercase"><?= esc_html( $benefit['title'] ) ?></h3>
						<p class="mt-3 text-[0.92rem] leading-relaxed text-bone/70"><?= esc_html( $benefit['body'] ) ?></p>
					</li>
				<?php endforeach; ?>
			</ul>
		</div>
	</div>
</section>

<section class="<?= gm_space() ?> bg-bone">
	<div class="<?= gm_container() ?>">
		<div class="space-y-16 lg:space-y-24">
			<?php foreach ( $service['content'] as $i => $block ) : ?>
				<div class="grid gap-8 lg:grid-cols-12 lg:gap-16">
					<div class="lg:col-span-4">
						<div<?= gm_reveal() ?>>
							<div class="flex items-baseline gap-4">
								<span class="font-display text-[0.78rem] font-extrabold tracking-[0.14em] text-gold tabular-nums"><?= gm_pad( $i + 1 ) ?></span>
								<h2 class="t-h3 text-charcoal"><?= esc_html( $block['heading'] ) ?></h2>
							</div>
						</div>
					</div>

					<div class="lg:col-span-7 lg:col-start-6">
						<div<?= gm_reveal( 'up', 80 ) ?>>
							<div class="space-y-5 text-[1.02rem] leading-relaxed text-muted">
								<?php foreach ( $block['paragraphs'] as $paragraph ) : ?>
									<p><?= esc_html( $paragraph ) ?></p>
								<?php endforeach; ?>
							</div>
						</div>

						<?php if ( ! empty( $block['bullets'] ) ) : ?>
							<div<?= gm_reveal( 'up', 140 ) ?>>
								<ul class="mt-8 grid gap-x-8 gap-y-3 border-t border-charcoal/12 pt-7 sm:grid-cols-2">
									<?php foreach ( $block['bullets'] as $bullet ) : ?>
										<li class="flex items-start gap-2.5">
											<span aria-hidden="true" class="mt-2.5 size-1.5 shrink-0 bg-gold"></span>
											<span class="text-[0.92rem] leading-relaxed text-muted"><?= esc_html( $bullet ) ?></span>
										</li>
									<?php endforeach; ?>
								</ul>
							</div>
						<?php endif; ?>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<?php
get_template_part(
	'template-parts/process',
	null,
	array(
		'steps'   => $service['process'],
		'eyebrow' => 'Our Process',
		'heading' => "How we handle $lower",
	)
);
?>

<section class="<?= gm_space( 'tight' ) ?> bg-sand/60" aria-labelledby="why-us-heading">
	<div class="<?= gm_container() ?>">
		<div class="grid gap-10 lg:grid-cols-12 lg:gap-16">
			<div class="lg:col-span-5">
				<div<?= gm_reveal() ?>><?= gm_eyebrow( esc_html( "Why {$b['name']}" ) ) ?></div>
				<div<?= gm_reveal( 'up', 60 ) ?>>
					<h2 id="why-us-heading" class="t-h3 mt-5 text-charcoal">Who is doing the work</h2>
				</div>
				<div<?= gm_reveal( 'up', 120 ) ?>>
					<ul class="mt-7 space-y-3.5">
						<?php foreach ( $points as $point ) : ?>
							<li class="flex items-start gap-3">
								<span aria-hidden="true" class="mt-2.5 h-px w-4 shrink-0 bg-gold"></span>
								<span class="text-[0.93rem] leading-relaxed text-muted"><?= esc_html( $point ) ?></span>
							</li>
						<?php endforeach; ?>
					</ul>
				</div>
			</div>

			<div class="lg:col-span-6 lg:col-start-7">
				<div class="grid grid-cols-2 gap-px border border-charcoal/12 bg-charcoal/12">
					<?php foreach ( $reasons as $i => list( $value, $label ) ) : ?>
						<div<?= gm_reveal( 'up', $i * 80 ) ?> class="bg-bone px-6 py-8 sm:px-8">
							<p class="font-display text-[2rem] leading-none font-extrabold tracking-tight text-forest sm:text-[2.5rem]"><?= esc_html( $value ) ?></p>
							<p class="mt-2.5 font-display text-[0.68rem] leading-tight font-bold tracking-[0.16em] text-muted uppercase"><?= esc_html( $label ) ?></p>
						</div>
					<?php endforeach; ?>
				</div>
			</div>
		</div>
	</div>
</section>

<?php if ( $service['gallery'] ) : ?>
	<section class="<?= gm_space( 'tight' ) ?> bg-sand/60" aria-labelledby="service-gallery-heading">
		<div class="<?= gm_container() ?>">
			<div<?= gm_reveal() ?>><?= gm_eyebrow( 'Recent Work' ) ?></div>
			<div<?= gm_reveal( 'up', 60 ) ?>>
				<h2 id="service-gallery-heading" class="t-h2 mt-5 text-charcoal"><?= esc_html( $name ) ?> on real properties</h2>
			</div>

			<ul class="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<?php foreach ( $service['gallery'] as $i => $photo ) : ?>
					<li<?= gm_reveal( 'scale', $i * 80 ) ?>>
						<div class="relative aspect-3/4 overflow-hidden bg-charcoal">
							<?= gm_img( $photo, 'img-zoom object-cover', array( 'fill' => true ) ) ?>
						</div>
					</li>
				<?php endforeach; ?>
			</ul>

			<div<?= gm_reveal( 'up', 200 ) ?>>
				<a href="<?= esc_url( gm_url( '/gallery' ) ) ?>" class="t-eyebrow mt-8 inline-flex items-center gap-2.5 text-charcoal transition-colors hover:text-forest">
					View the full gallery
					<?= gm_icon( 'arrow-right', 'size-4', 2.5 ) ?>
				</a>
			</div>
		</div>
	</section>
<?php endif; ?>

<?php get_template_part( 'template-parts/areas-strip', null, array( 'service_name' => $name ) ); ?>

<?php /* Native <details>: keyboard, screen reader and in-page find work with no script. */ ?>
<section class="<?= gm_space() ?> bg-bone" aria-labelledby="service-faq-heading">
	<div class="<?= gm_container() ?>">
		<div class="grid gap-10 lg:grid-cols-12 lg:gap-16">
			<div class="lg:col-span-4">
				<div<?= gm_reveal() ?>><?= gm_eyebrow( esc_html( "$name FAQs" ) ) ?></div>
				<div<?= gm_reveal( 'up', 60 ) ?>>
					<h2 id="service-faq-heading" class="t-h2 mt-6 text-charcoal">Questions about <?= esc_html( $lower ) ?></h2>
				</div>
			</div>

			<div class="lg:col-span-8">
				<div class="border-t border-charcoal/15">
					<?php foreach ( $service['faq'] as $i => $faq ) : ?>
						<div<?= gm_reveal( 'up', $i * 50 ) ?>>
							<details class="group border-b border-charcoal/12">
								<summary class="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
									<h3 class="font-display text-[1.02rem] leading-snug font-bold tracking-tight text-charcoal transition-colors group-hover:text-forest sm:text-[1.1rem]"><?= esc_html( $faq['question'] ) ?></h3>
									<span aria-hidden="true" class="mt-0.5 flex size-6 shrink-0 items-center justify-center border border-charcoal/20 text-charcoal transition-all duration-300 group-open:rotate-45 group-open:border-gold group-open:bg-gold">
										<?= gm_icon( 'plus', 'size-3.5', 2.5 ) ?>
									</span>
								</summary>
								<p class="measure pr-10 pb-6 text-[0.95rem] leading-relaxed text-muted"><?= esc_html( $faq['answer'] ) ?></p>
							</details>
						</div>
					<?php endforeach; ?>
				</div>
			</div>
		</div>
	</div>
</section>

<?php if ( $related ) : ?>
	<section class="<?= gm_space( 'tight' ) ?> bg-bone" aria-labelledby="related-heading">
		<div class="<?= gm_container() ?>">
			<div<?= gm_reveal() ?>><?= gm_eyebrow( 'Related Services' ) ?></div>
			<div<?= gm_reveal( 'up', 60 ) ?>>
				<h2 id="related-heading" class="t-h2 mt-5 text-charcoal">Often needed alongside this</h2>
			</div>

			<ul class="mt-11 grid gap-px border border-charcoal/12 bg-charcoal/12 sm:grid-cols-2 lg:grid-cols-4">
				<?php foreach ( array_values( $related ) as $i => $other ) : ?>
					<li<?= gm_reveal( 'up', $i * 70 ) ?> class="bg-bone">
						<a href="<?= esc_url( gm_url( "/services/{$other['slug']}" ) ) ?>" class="group flex h-full flex-col p-7 transition-colors hover:bg-sand/70">
							<h3 class="t-h4 text-charcoal uppercase transition-colors group-hover:text-forest"><?= esc_html( $other['name'] ) ?></h3>
							<p class="mt-3 flex-1 text-[0.9rem] leading-relaxed text-muted"><?= esc_html( $other['cardSummary'] ) ?></p>
							<span class="mt-6 inline-flex items-center gap-2 font-display text-[0.7rem] font-bold tracking-[0.14em] text-forest uppercase">
								Learn more
								<?= gm_icon( 'arrow-right', 'arrow-shift size-3.5', 2.6 ) ?>
							</span>
						</a>
					</li>
				<?php endforeach; ?>
			</ul>
		</div>
	</section>
<?php endif; ?>

<section class="<?= gm_space( 'loose' ) ?> relative isolate overflow-hidden bg-charcoal" aria-labelledby="final-cta-heading">
	<div aria-hidden="true" class="glass-facet pointer-events-none absolute -top-64 -right-40 size-[52rem] text-bone/[0.04]"></div>
	<div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent"></div>

	<div class="<?= gm_container() ?> relative">
		<div class="max-w-4xl">
			<div<?= gm_reveal() ?>>
				<p class="t-eyebrow flex items-center gap-3 text-gold">
					<span aria-hidden="true" class="h-px w-8 bg-gold/60"></span>
					<?= esc_html( "Appointments · {$b['city']}, {$b['stateCode']}" ) ?>
				</p>
			</div>

			<div<?= gm_reveal( 'up', 80 ) ?>>
				<h2 id="final-cta-heading" class="t-display mt-7 text-bone">
					Need <?= esc_html( $lower ) ?><br>
					<span class="text-gold">in <?= esc_html( $b['city'] ) ?>?</span>
				</h2>
			</div>

			<div<?= gm_reveal( 'up', 140 ) ?>>
				<p class="mt-8 max-w-2xl text-[1.05rem] leading-relaxed text-bone/75"><?= esc_html( "Tell us what you are looking at and we will help you schedule a measure or consult. Serving {$b['city']} and surrounding communities." ) ?></p>
			</div>

			<div<?= gm_reveal( 'up', 200 ) ?>>
				<div class="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
					<?=
					gm_button(
						esc_html( gm_cta( 'estimate' ) ),
						gm_url( '/contact' ),
						array(
							'size'  => 'lg',
							'arrow' => true,
							'attrs' => array(
								'data-cta'      => 'estimate',
								'data-location' => 'final_cta',
							),
						)
					)
					?>
					<a href="<?= esc_attr( gm_tel() ) ?>" data-cta="phone" data-location="final_cta" class="group inline-flex items-center gap-3 font-display text-[1.5rem] leading-none font-extrabold tracking-tight text-bone transition-colors hover:text-gold sm:ml-4 sm:text-[1.75rem]">
						<?= gm_icon( 'phone', 'size-5 text-gold', 2.5 ) ?>
						<?= esc_html( $b['phone'] ) ?>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<?php
get_footer();
