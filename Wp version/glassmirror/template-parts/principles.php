<?php
/**
 * Mission and vision list, shared by the home and about pages. Copy comes from
 * `principles` in the content; the icons are presentation.
 */

defined( 'ABSPATH' ) || exit;

$icons = array(
	'mission' => 'target',
	'vision'  => 'compass',
);
?>
<ul class="<?= esc_attr( $args['class'] ?? 'mt-14 grid gap-x-14 gap-y-12 border-t border-charcoal-line pt-12 lg:grid-cols-2' ) ?>">
	<?php foreach ( gm_content( 'principles' ) as $i => $principle ) : ?>
		<li<?= gm_reveal( 'up', $i * 90 ) ?> class="lg:border-l lg:border-charcoal-line lg:pl-14 lg:first:border-l-0 lg:first:pl-0">
			<p class="flex items-center gap-3 font-display text-[0.7rem] font-extrabold tracking-[0.16em] text-gold uppercase">
				<?= gm_icon( $icons[ $principle['id'] ], 'size-5 shrink-0', 1.8 ) ?>
				<?= esc_html( $principle['label'] ) ?>
			</p>
			<h3 class="mt-5 max-w-[22ch] font-display text-[1.5rem] leading-[1.08] font-extrabold tracking-[-0.035em] text-bone sm:text-[1.8rem]"><?= esc_html( $principle['statement'] ) ?></h3>
			<p class="mt-4 max-w-[48ch] text-[0.95rem] leading-relaxed text-bone/65"><?= esc_html( $principle['copy'] ) ?></p>
		</li>
	<?php endforeach; ?>
</ul>
