<?php
/**
 * /service-areas hub (app/service-areas/page.tsx).
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>
<section class="bg-charcoal pb-16 pt-32 text-bone sm:pb-20 sm:pt-40">
	<div class="<?= gm_container( 'wide' ) ?>">
		<p class="eyebrow-line text-gold">Where we work</p>
		<h1 class="home-h2 mt-7 max-w-[48rem] text-bone">Glass &amp; mirror across Greater Houston.</h1>
		<p class="mt-6 max-w-[38rem] text-[1.05rem] leading-relaxed text-bone/72">Based in Houston, we work across nearby communities. Each location page explains what local homes and businesses tend to call for.</p>
	</div>
</section>

<section class="bg-sand py-16 sm:py-24 lg:py-28">
	<div class="<?= gm_container() ?>">
		<div class="grid gap-px border border-charcoal/15 bg-charcoal/15 sm:grid-cols-2 lg:grid-cols-3">
			<?php foreach ( gm_content( 'primaryAreaSlugs' ) as $slug ) : ?>
				<?php $area = gm_area( $slug ); ?>
				<a href="<?= esc_url( gm_url( "/service-areas/$slug" ) ) ?>" class="group flex min-h-[10rem] flex-col justify-between bg-bone p-6 transition-colors hover:bg-forest hover:text-bone sm:p-8">
					<span class="font-display text-[1.35rem] font-extrabold tracking-tight"><?= esc_html( "{$area['city']}, {$area['stateCode']}" ) ?></span>
					<span class="mt-8 flex items-center justify-between text-[0.75rem] font-bold tracking-[0.12em] text-muted uppercase group-hover:text-gold">
						<span><?= esc_html( $area['county'] ) ?></span>
						<?= gm_icon( 'arrow-up-right', 'size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5', 2.2 ) ?>
					</span>
				</a>
			<?php endforeach; ?>
		</div>

		<div class="mt-14 max-w-[44rem]">
			<p class="eyebrow-line text-forest">Nearby communities</p>
			<p class="mt-5 text-[0.96rem] leading-relaxed text-muted">We also take calls from <?= esc_html( implode( ', ', gm_content( 'additionalCommunities' ) ) ) ?>. If you are close to Houston and do not see your city above, call and ask.</p>
		</div>
	</div>
</section>
<?php
get_footer();
