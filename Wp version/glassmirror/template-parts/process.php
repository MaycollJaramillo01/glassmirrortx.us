<?php
/**
 * Numbered process (components/sections/ProcessSection).
 *
 * @var array $args { steps?: list of { title, body }, eyebrow?, heading?, tone?: 'dark'|'light' }
 */

defined( 'ABSPATH' ) || exit;

$steps = $args['steps'] ?? array(
	array(
		'title' => 'Request your appointment',
		'body'  => 'Call or send the form. Tell us what glass or mirror work you need and where the property is.',
	),
	array(
		'title' => 'On-site measure',
		'body'  => 'We come out, measure the opening, check access and finishes, and price the work before anything is scheduled.',
	),
	array(
		'title' => 'Fabrication & install',
		'body'  => 'Glass is cut, tempered or sourced as needed, then installed with care for the surrounding finishes.',
	),
	array(
		'title' => 'Clean finish',
		'body'  => 'Hardware is checked, the area is cleaned, and the space is ready to use when we leave.',
	),
);
$light = 'light' === ( $args['tone'] ?? 'dark' );
?>
<section class="<?= gm_space() ?> <?= $light ? 'bg-forest' : 'bg-bone' ?>" aria-labelledby="process-heading">
	<div class="<?= gm_container() ?>">
		<div class="max-w-2xl">
			<div<?= gm_reveal() ?>><?= gm_eyebrow( esc_html( $args['eyebrow'] ?? 'How It Works' ), $light ? 'light' : 'dark' ) ?></div>
			<div<?= gm_reveal( 'up', 60 ) ?>>
				<h2 id="process-heading" class="t-h2 mt-6 <?= $light ? 'text-bone' : 'text-charcoal' ?>"><?= esc_html( $args['heading'] ?? 'Four steps, start to finish' ) ?></h2>
			</div>
		</div>

		<ol class="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
			<?php foreach ( $steps as $i => $step ) : ?>
				<li<?= gm_reveal( 'up', $i * 110 ) ?> class="relative pt-7 <?= $light ? 'border-t border-bone/25' : 'border-t border-charcoal/15' ?>">
					<span aria-hidden="true" class="absolute -top-px left-0 h-0.5 w-10 <?= $light ? 'bg-gold' : 'bg-forest' ?>"></span>
					<span class="t-numeral block tabular-nums <?= $light ? 'text-bone/25' : 'text-charcoal/15' ?>"><?= gm_pad( $i + 1 ) ?></span>
					<h3 class="t-h4 mt-5 uppercase <?= $light ? 'text-bone' : 'text-charcoal' ?>"><?= esc_html( $step['title'] ) ?></h3>
					<p class="mt-3 max-w-[38ch] text-[0.92rem] leading-relaxed <?= $light ? 'text-bone/70' : 'text-muted' ?>"><?= esc_html( $step['body'] ) ?></p>
				</li>
			<?php endforeach; ?>
		</ol>
	</div>
</section>
