<?php
/**
 * /privacy-policy (app/privacy-policy/page.tsx).
 */

defined( 'ABSPATH' ) || exit;

$b = gm_business();

get_header();
?>
<section class="bg-bone pb-24 pt-32 sm:pt-40">
	<div class="<?= gm_container() ?> max-w-3xl">
		<p class="eyebrow-line text-forest">Legal</p>
		<h1 class="home-h2 mt-7 text-charcoal">Privacy policy</h1>
		<div class="mt-10 space-y-6 text-[0.98rem] leading-relaxed text-muted">
			<p><?= esc_html( $b['legalName'] ) ?> uses the information you submit through this site to respond to appointment requests, schedule service and answer questions. We do not sell submitted contact information.</p>
			<p>Information may include your name, phone number, email address, property city and the details you provide about the work. We keep it only as long as needed for the business purpose for which it was submitted.</p>
			<p>To ask about your information, contact <a class="text-forest underline decoration-gold underline-offset-4" href="mailto:<?= esc_attr( $b['email'] ) ?>"><?= esc_html( $b['email'] ) ?></a> or call <a class="text-forest underline decoration-gold underline-offset-4" href="<?= esc_attr( gm_tel() ) ?>"><?= esc_html( $b['phone'] ) ?></a>.</p>
		</div>
	</div>
</section>
<?php
get_footer();
