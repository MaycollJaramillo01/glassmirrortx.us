<?php
/**
 * /services hub (app/services/page.tsx).
 */

defined( 'ABSPATH' ) || exit;

$b = gm_business();

get_header();

get_template_part(
	'template-parts/page-hero',
	null,
	array(
		'eyebrow' => 'Our Services',
		'title'   => count( gm_content( 'services' ) ) . ' services. <span class="text-gold">One shop that does all of it.</span>',
		'lead'    => "Glass and mirror work for residential and commercial properties {$b['radiusLabel']}. Licensed & insured, scheduled by appointment.",
	)
);
?>

<?php foreach ( gm_service_groups() as $group_index => $entry ) : ?>
	<?php $group = $entry['group']; ?>
	<section class="<?= gm_space() ?> <?= 1 === $group_index % 2 ? 'bg-sand/50' : 'bg-bone' ?>" aria-labelledby="group-<?= esc_attr( $group['id'] ) ?>">
		<div class="<?= gm_container() ?>">
			<div class="max-w-[44rem]">
				<div<?= gm_reveal() ?>>
					<p class="font-display text-[0.7rem] font-extrabold tracking-[0.16em] text-forest uppercase tabular-nums"><?= gm_pad( $group_index + 1 ) ?> · <?= count( $entry['items'] ) ?> services</p>
				</div>
				<div<?= gm_reveal( 'up', 60 ) ?>>
					<h2 id="group-<?= esc_attr( $group['id'] ) ?>" class="home-h2 mt-5 text-charcoal"><?= esc_html( $group['name'] ) ?></h2>
				</div>
				<div<?= gm_reveal( 'up', 110 ) ?>>
					<p class="mt-5 text-[1.02rem] leading-relaxed text-muted"><?= esc_html( $group['summary'] ) ?></p>
				</div>
			</div>

			<ul class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<?php foreach ( $entry['items'] as $i => $service ) : ?>
					<li<?= gm_reveal( 'up', $i * 90 ) ?>>
						<a href="<?= esc_url( gm_url( "/services/{$service['slug']}" ) ) ?>" class="group flex h-full flex-col overflow-hidden border border-charcoal/12 bg-white transition-colors hover:border-charcoal/30">
							<div class="relative aspect-[4/3] shrink-0 overflow-hidden bg-charcoal">
								<?php if ( $service['heroImage'] ) : ?>
									<?=
									gm_img(
										$service['heroImage'],
										'img-zoom object-cover',
										array(
											'fill' => true,
											'alt'  => '',
										)
									)
									?>
								<?php endif; ?>
								<span aria-hidden="true" class="absolute top-0 left-0 bg-charcoal px-3 py-2 font-display text-[0.68rem] font-extrabold tracking-[0.16em] text-gold tabular-nums"><?= gm_pad( $i + 1 ) ?></span>
							</div>

							<div class="flex flex-1 flex-col p-6 sm:p-7">
								<h3 class="font-display text-[1.4rem] leading-tight font-extrabold tracking-[-0.03em] text-charcoal transition-colors group-hover:text-forest"><?= esc_html( $service['name'] ) ?></h3>
								<p class="mt-3 text-[0.94rem] leading-relaxed text-muted"><?= esc_html( $service['cardSummary'] ) ?></p>
								<span class="mt-auto inline-flex items-center gap-2 pt-6 font-display text-[0.7rem] font-extrabold tracking-[0.14em] text-forest uppercase">
									Explore
									<?= gm_icon( 'arrow-right', 'arrow-shift size-3.5', 2.6 ) ?>
								</span>
							</div>
						</a>
					</li>
				<?php endforeach; ?>
			</ul>
		</div>
	</section>
<?php endforeach; ?>

<?php
get_template_part( 'template-parts/process', null, array( 'tone' => 'light' ) );
get_template_part( 'template-parts/areas-strip', null, array( 'service_name' => 'Glass & mirror services' ) );
get_template_part(
	'template-parts/contact-cta',
	null,
	array(
		'location' => 'services_cta',
		'title'    => 'Not sure which one <span class="text-gold">you need?</span>',
		'lead'     => 'Describe the opening and we will tell you what the job actually is. Appointments are scheduled after we understand the glass, the access and the finish you want.',
	)
);

get_footer();
