<?php
/**
 * Fallback for blog, archive and search listings.
 */

defined( 'ABSPATH' ) || exit;

if ( is_search() ) {
	$gm_title = sprintf( 'Search results for “%s”', get_search_query() );
} elseif ( is_home() ) {
	$gm_title = get_option( 'page_for_posts' ) ? get_the_title( get_option( 'page_for_posts' ) ) : 'Latest posts';
} else {
	$gm_title = wp_strip_all_tags( get_the_archive_title() );
}

get_header();
?>
<section class="relative isolate overflow-hidden bg-charcoal">
	<div aria-hidden="true" class="glass-facet pointer-events-none absolute -top-52 -right-32 size-[44rem] text-bone/[0.05]"></div>
	<div class="<?= gm_container( 'wide' ) ?> relative z-10 pt-32 pb-16 md:pt-40 md:pb-24">
		<h1 class="t-h1 max-w-4xl text-bone"><?= esc_html( $gm_title ) ?></h1>
	</div>
</section>

<section class="bg-bone py-16 md:py-24">
	<div class="<?= gm_container() ?> max-w-3xl">
		<?php if ( have_posts() ) : ?>
			<ul class="divide-y divide-charcoal/15 border-y border-charcoal/15">
				<?php
				while ( have_posts() ) :
					the_post();
					?>
					<li class="py-8">
						<p class="t-eyebrow text-forest"><?= esc_html( get_the_date() ) ?></p>
						<h2 class="t-h3 mt-3 text-charcoal"><a href="<?php the_permalink(); ?>" class="transition-colors hover:text-forest"><?php the_title(); ?></a></h2>
						<div class="mt-3 text-[0.96rem] leading-relaxed text-muted"><?php the_excerpt(); ?></div>
					</li>
				<?php endwhile; ?>
			</ul>
			<div class="mt-10 font-display text-[0.8rem] font-bold tracking-[0.1em] text-charcoal uppercase [&_.nav-links]:flex [&_.nav-links]:flex-wrap [&_.nav-links]:gap-5 [&_.current]:text-forest">
				<?php the_posts_pagination(); ?>
			</div>
		<?php else : ?>
			<p class="text-muted">Nothing here yet.</p>
		<?php endif; ?>
	</div>
</section>
<?php
get_footer();
