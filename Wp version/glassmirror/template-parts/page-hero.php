<?php
/**
 * Shared hero for the secondary pages (components/layout/PageHero). Every page
 * opens on a dark band, which is what lets the fixed header sit over it.
 *
 * @var array $args {
 *     eyebrow:   string (text)
 *     title:     string (HTML)
 *     lead?:     string (text)
 *     image?:    photo
 *     children?: string (HTML, printed under the lead)
 * }
 */

defined( 'ABSPATH' ) || exit;

$image = $args['image'] ?? null;
?>
<section class="relative isolate overflow-hidden bg-charcoal">
	<?php if ( $image ) : ?>
		<?=
		gm_img(
			$image,
			'-z-10 object-cover object-center',
			array(
				'fill'     => true,
				'priority' => true,
				'alt'      => '',
			)
		)
		?>
		<div aria-hidden="true" class="-z-10 absolute inset-0" style="background:linear-gradient(100deg, rgba(23,28,25,0.96) 0%, rgba(23,28,25,0.88) 45%, rgba(23,28,25,0.60) 100%)"></div>
	<?php else : ?>
		<div aria-hidden="true" class="glass-facet pointer-events-none absolute -top-52 -right-32 size-[44rem] text-bone/[0.05]"></div>
	<?php endif; ?>

	<div class="<?= gm_container( 'wide' ) ?> relative z-10 pt-32 pb-16 md:pt-40 md:pb-24">
		<?php get_template_part( 'template-parts/breadcrumbs', null, array( 'trail' => gm_seo()['trail'] ) ); ?>

		<p class="t-eyebrow flex items-center gap-3 text-gold">
			<span aria-hidden="true" class="h-px w-8 bg-gold/60"></span>
			<?= esc_html( $args['eyebrow'] ) ?>
		</p>

		<h1 class="t-h1 mt-6 max-w-4xl text-bone"><?= wp_kses_post( $args['title'] ) ?></h1>

		<?php if ( ! empty( $args['lead'] ) ) : ?>
			<p class="mt-7 max-w-2xl text-[1.02rem] leading-relaxed text-bone/80 sm:text-[1.0625rem]"><?= esc_html( $args['lead'] ) ?></p>
		<?php endif; ?>

		<?= $args['children'] ?? '' ?>
	</div>
</section>
