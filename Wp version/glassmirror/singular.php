<?php
/**
 * Pages and posts created in wp-admin, in the site's look.
 */

defined( 'ABSPATH' ) || exit;

get_header();

while ( have_posts() ) :
	the_post();
	?>
	<section class="relative isolate overflow-hidden bg-charcoal">
		<div aria-hidden="true" class="glass-facet pointer-events-none absolute -top-52 -right-32 size-[44rem] text-bone/[0.05]"></div>
		<div class="<?= gm_container( 'wide' ) ?> relative z-10 pt-32 pb-16 md:pt-40 md:pb-24">
			<?php if ( is_single() ) : ?>
				<p class="t-eyebrow mb-6 flex items-center gap-3 text-gold">
					<span aria-hidden="true" class="h-px w-8 bg-gold/60"></span>
					<?= esc_html( get_the_date() ) ?>
				</p>
			<?php endif; ?>
			<h1 class="t-h1 max-w-4xl text-bone"><?php the_title(); ?></h1>
		</div>
	</section>

	<section class="bg-bone py-16 md:py-24">
		<div class="<?= gm_container() ?> max-w-3xl">
			<?php if ( has_post_thumbnail() ) : ?>
				<?php the_post_thumbnail( 'large', array( 'class' => 'mb-10 h-auto w-full' ) ); ?>
			<?php endif; ?>
			<div class="entry-content"><?php the_content(); ?></div>
			<?php wp_link_pages(); ?>
		</div>
	</section>
	<?php
endwhile;

get_footer();
