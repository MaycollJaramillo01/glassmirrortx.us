<?php
/**
 * /gallery (app/gallery/page.tsx + components/gallery/GalleryGrid).
 * Filtering is client-side in assets/js/theme.js; every photo is in the HTML.
 * The before/after block is not ported: the Next.js site has no pairs yet.
 */

defined( 'ABSPATH' ) || exit;

$b      = gm_business();
$items  = gm_content( 'galleryItems' );
$counts = array();
foreach ( gm_content( 'galleryCategories' ) as $category ) {
	$counts[ $category ] = 'All' === $category ? count( $items ) : count( wp_list_filter( $items, array( 'category' => $category ) ) );
}

get_header();

get_template_part(
	'template-parts/page-hero',
	null,
	array(
		'eyebrow' => 'Recent work',
		'title'   => 'The work should <span class="text-gold">speak for itself.</span>',
		'lead'    => "Photographs from real {$b['name']} projects across Houston and the surrounding communities.",
		'image'   => $items[0],
	)
);
?>

<section class="<?= gm_space() ?> bg-white" aria-labelledby="gallery-heading">
	<div class="<?= gm_container() ?>">
		<div class="max-w-[46rem]">
			<h2 id="gallery-heading" class="home-h2 text-charcoal">Every job, filed by service.</h2>
			<p class="mt-6 text-[1.02rem] leading-relaxed text-muted">
				<?= count( $items ) ?> photographs from Martinez Orlyn Glass &amp; Mirror projects,
				organized by work type. Filter by showers, mirrors, windows and more.
			</p>
		</div>

		<div class="mt-12">
			<div class="flex flex-wrap gap-2" role="group" aria-label="Filter gallery by category" data-gallery-filters>
				<?php foreach ( $counts as $category => $count ) : ?>
					<?php
					if ( 0 === $count ) {
						continue;
					}
					$active = 'All' === $category;
					?>
					<button type="button" data-filter="<?= esc_attr( $category ) ?>" aria-pressed="<?= $active ? 'true' : 'false' ?>" class="inline-flex min-h-[40px] items-center gap-2 border px-4 py-2 font-display text-[0.7rem] font-bold tracking-[0.1em] uppercase transition-colors <?= $active ? 'border-forest bg-forest text-bone' : 'border-charcoal/15 bg-white text-charcoal hover:border-forest hover:text-forest' ?>">
						<?= esc_html( $active ? 'All work' : $category ) ?>
						<span class="tabular-nums <?= $active ? 'text-bone/70' : 'text-muted' ?>"><?= (int) $count ?></span>
					</button>
				<?php endforeach; ?>
			</div>

			<ul class="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3" data-gallery-grid>
				<?php foreach ( $items as $photo ) : ?>
					<li data-category="<?= esc_attr( $photo['category'] ) ?>" class="mb-4 break-inside-avoid">
						<figure class="group relative overflow-hidden bg-charcoal/5">
							<?= gm_img( $photo, 'h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]' ) ?>
							<figcaption class="absolute inset-x-0 bottom-0 bg-linear-to-t from-charcoal/85 to-transparent px-4 pt-10 pb-4">
								<p class="font-display text-[0.68rem] font-bold tracking-[0.14em] text-gold uppercase"><?= esc_html( $photo['category'] ) ?></p>
								<p class="mt-1 text-[0.9rem] font-semibold text-bone"><?= esc_html( $photo['caption'] ) ?></p>
							</figcaption>
						</figure>
					</li>
				<?php endforeach; ?>
			</ul>
		</div>
	</div>
</section>

<?php
get_template_part(
	'template-parts/contact-cta',
	null,
	array(
		'location' => 'gallery_cta',
		'title'    => 'Want your project <span class="text-gold">on this page?</span>',
		'lead'     => "Tell us what you need and we will come out, measure the opening and help you schedule — {$b['radiusLabel']}.",
	)
);

get_footer();
