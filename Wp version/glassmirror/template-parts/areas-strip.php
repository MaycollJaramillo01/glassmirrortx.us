<?php
/**
 * Compact areas strip (components/services/AreasServedStrip). Links every page
 * that uses it into the location pages.
 *
 * @var array $args { service_name: string }
 */

defined( 'ABSPATH' ) || exit;

$b = gm_business();
?>
<section class="<?= gm_space( 'tight' ) ?> bg-charcoal" aria-labelledby="areas-served-heading">
	<div class="<?= gm_container() ?>">
		<div class="grid gap-9 lg:grid-cols-12 lg:gap-14">
			<div class="lg:col-span-4">
				<div<?= gm_reveal() ?>><?= gm_eyebrow( 'Where We Work', 'light' ) ?></div>
				<div<?= gm_reveal( 'up', 60 ) ?>>
					<h2 id="areas-served-heading" class="t-h3 mt-5 text-bone"><?= esc_html( "{$args['service_name']} across {$b['radiusMiles']} miles of Houston" ) ?></h2>
				</div>
				<div<?= gm_reveal( 'up', 120 ) ?>>
					<p class="mt-5 flex items-start gap-2.5 text-[0.92rem] leading-relaxed text-bone/65">
						<?= gm_icon( 'map-pin', 'mt-0.5 size-4 shrink-0 text-gold' ) ?>
						<?= esc_html( "Serving communities in Harris, Fort Bend, Montgomery, Brazoria and Galveston counties {$b['radiusLabel']}." ) ?>
					</p>
				</div>
			</div>

			<div class="lg:col-span-8">
				<div<?= gm_reveal( 'up', 80 ) ?>>
					<ul class="flex flex-wrap gap-2">
						<?php foreach ( gm_content( 'serviceAreas' ) as $area ) : ?>
							<li>
								<a href="<?= esc_url( gm_url( "/service-areas/{$area['slug']}" ) ) ?>" class="inline-flex items-center border border-bone/20 px-4 py-2.5 text-[0.85rem] text-bone/75 transition-colors hover:border-gold hover:bg-gold hover:text-charcoal"><?= esc_html( "{$area['city']}, {$area['stateCode']}" ) ?></a>
							</li>
						<?php endforeach; ?>
						<li>
							<a href="<?= esc_url( gm_url( '/service-areas' ) ) ?>" class="inline-flex items-center border border-gold bg-gold/10 px-4 py-2.5 font-display text-[0.78rem] font-bold tracking-[0.1em] text-gold uppercase transition-colors hover:bg-gold hover:text-charcoal">All areas →</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>
