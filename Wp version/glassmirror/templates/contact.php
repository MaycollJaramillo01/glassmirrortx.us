<?php
/**
 * /contact (app/contact/page.tsx + components/contact/EstimateForm).
 * The form posts to inc/contact.php; assets/js/theme.js handles photos and states.
 */

defined( 'ABSPATH' ) || exit;

$b     = gm_business();
$input = 'mt-2 w-full border border-charcoal/20 bg-white px-4 py-3.5 text-[0.96rem] text-charcoal outline-none transition-colors placeholder:text-muted/80 focus:border-forest focus:ring-2 focus:ring-gold/50';

get_header();

ob_start();
?>
<div class="mt-11 flex flex-col gap-5 border-t border-bone/15 pt-8 sm:flex-row sm:items-center sm:gap-10">
	<a href="<?= esc_attr( gm_tel() ) ?>" data-cta="phone" data-location="contact_hero" class="inline-flex min-h-[44px] items-center gap-3 font-display text-[1.35rem] font-extrabold tracking-tight text-bone transition-colors hover:text-gold">
		<?= gm_icon( 'phone', 'size-5 shrink-0 text-gold', 2.4 ) ?>
		<?= esc_html( $b['phone'] ) ?>
	</a>
	<a href="mailto:<?= esc_attr( $b['email'] ) ?>" data-cta="email" data-location="contact_hero" class="inline-flex min-h-[44px] items-center gap-3 text-[0.92rem] break-all text-bone/70 transition-colors hover:text-gold">
		<?= gm_icon( 'mail', 'size-4 shrink-0 text-gold' ) ?>
		<?= esc_html( $b['email'] ) ?>
	</a>
</div>
<?php
get_template_part(
	'template-parts/page-hero',
	null,
	array(
		'eyebrow'  => 'Start with the actual job',
		'title'    => 'Tell us what glass work you need.',
		'lead'     => 'Give us the useful details. We will look at the opening, explain the work and help you schedule an appointment.',
		'image'    => gm_photo( 'mirrorInstall' ),
		'children' => ob_get_clean(),
	)
);
?>

<section class="bg-sand py-16 sm:py-24 lg:py-28">
	<div class="<?= gm_container() ?> grid gap-12 lg:grid-cols-12 lg:gap-16">
		<div class="lg:col-span-4">
			<p class="eyebrow-line text-forest"><?= esc_html( gm_cta( 'estimate' ) ) ?></p>
			<h2 class="home-h2 mt-6 text-charcoal">Send a message — photos welcome.</h2>
			<div class="mt-8 space-y-5 border-t border-charcoal/15 pt-6 text-[0.92rem] leading-relaxed text-muted">
				<p>
					Tell us where the property is, what glass or mirror work you need, and attach photos of the
					opening if you have them.
				</p>
				<p>Prefer to talk through it? Call <?= esc_html( $b['phone'] ) ?> or use WhatsApp.</p>
				<div class="flex items-start gap-3 text-charcoal">
					<?= gm_icon( 'map-pin', 'mt-1 size-4 shrink-0 text-gold', 2.4 ) ?>
					<a href="<?= esc_url( $b['googleMaps'] ) ?>" target="_blank" rel="noopener noreferrer" class="transition-colors hover:text-forest"><?= esc_html( $b['addressLine'] ) ?></a>
				</div>
				<div class="flex items-start gap-3 text-charcoal">
					<?= gm_icon( 'arrow-right', 'mt-1 size-4 shrink-0 text-gold', 2.4 ) ?>
					Serving Houston and nearby communities.
				</div>
			</div>
		</div>

		<div class="lg:col-span-7 lg:col-start-6" data-estimate>
			<form id="appointment-form" action="<?= esc_url( rest_url( 'glassmirror/v1/appointment' ) ) ?>" method="post" enctype="multipart/form-data" data-estimate-form data-phone="<?= esc_attr( $b['phone'] ) ?>" class="border border-charcoal/10 bg-white p-6 shadow-[0_16px_60px_rgba(23,28,25,0.08)] sm:p-9">
				<div class="grid gap-5 sm:grid-cols-2">
					<label class="text-[0.82rem] font-semibold text-charcoal">
						Name
						<input class="<?= $input ?>" name="name" required autocomplete="name" placeholder="Your name">
					</label>
					<label class="text-[0.82rem] font-semibold text-charcoal">
						Phone
						<input class="<?= $input ?>" name="phone" required autocomplete="tel" inputmode="tel" placeholder="Your phone number">
					</label>
					<label class="text-[0.82rem] font-semibold text-charcoal">
						Email <span class="font-normal text-muted">(optional)</span>
						<input class="<?= $input ?>" name="email" type="email" autocomplete="email" placeholder="you@example.com">
					</label>
					<label class="text-[0.82rem] font-semibold text-charcoal">
						Property city
						<input class="<?= $input ?>" name="city" required autocomplete="address-level2" placeholder="Houston">
					</label>
				</div>

				<label class="mt-5 block text-[0.82rem] font-semibold text-charcoal">
					What do you need help with?
					<select class="<?= $input ?>" name="service" required>
						<option value="" disabled selected>Select a service</option>
						<?php foreach ( gm_content( 'services' ) as $service ) : ?>
							<option><?= esc_html( $service['name'] ) ?></option>
						<?php endforeach; ?>
						<option>Other</option>
					</select>
				</label>

				<label class="mt-5 block text-[0.82rem] font-semibold text-charcoal">
					Message
					<textarea class="<?= $input ?> min-h-36 resize-y" name="details" required minlength="12" placeholder="Describe the glass or mirror work, the room, and anything we should know about the opening."></textarea>
				</label>

				<div class="mt-5">
					<p class="text-[0.82rem] font-semibold text-charcoal">
						Photos <span class="font-normal text-muted">(optional, up to <?= (int) GM_MAX_PHOTOS ?>)</span>
					</p>
					<p class="mt-1 text-[0.78rem] leading-relaxed text-muted">
						Attach pictures of the opening, broken glass, or the space you want measured. Keep each photo under
						1.2 MB.
					</p>

					<input id="appointment-photos" name="photos[]" type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.jpg,.jpeg,.png,.webp,.heic,.heif" multiple class="sr-only" data-photo-input data-max-photos="<?= (int) GM_MAX_PHOTOS ?>" data-max-bytes="<?= (int) GM_MAX_PHOTO_BYTES ?>">
					<label for="appointment-photos" class="mt-3 inline-flex min-h-[44px] cursor-pointer items-center gap-2 border border-dashed border-charcoal/25 bg-sand/40 px-4 py-3 text-[0.84rem] font-semibold text-charcoal transition-colors hover:border-forest hover:bg-sand">
						<?= gm_icon( 'image-plus', 'size-4 text-forest', 2.2 ) ?>
						Add photos
					</label>

					<ul hidden data-photo-list class="mt-4 grid gap-2 sm:grid-cols-2"></ul>
				</div>

				<label class="sr-only" aria-hidden="true">
					Company
					<input name="company" tabindex="-1" autocomplete="off">
				</label>

				<div class="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<p class="max-w-[24rem] text-[0.78rem] leading-relaxed text-muted">
						Send a message here, or call <?= esc_html( $b['phone'] ) ?>. Prefer WhatsApp? Use the green chat button.
					</p>
					<?=
					gm_button(
						esc_html( gm_cta( 'estimateSubmit' ) ),
						'',
						array(
							'variant' => 'secondary',
							'arrow'   => true,
							'type'    => 'submit',
							'attrs'   => array( 'data-submit' => true ),
						)
					)
					?>
				</div>

				<p hidden data-form-error role="alert" class="mt-5 border-l-2 border-gold bg-gold/10 px-4 py-3 text-[0.88rem] leading-relaxed text-charcoal"></p>
			</form>

			<div hidden data-form-success role="status" class="border border-forest/20 bg-white p-7 sm:p-10">
				<?= gm_icon( 'circle-check', 'size-8 text-forest', 1.8 ) ?>
				<h2 class="mt-6 font-display text-3xl font-extrabold tracking-tight text-charcoal">Request received.</h2>
				<p data-success-message class="mt-4 max-w-[38rem] text-[0.98rem] leading-relaxed text-muted"></p>
				<button type="button" data-form-reset class="mt-7 font-display text-[0.72rem] font-bold tracking-[0.12em] text-forest uppercase underline decoration-gold underline-offset-4 hover:text-gold-deep">Send another request</button>
			</div>
		</div>
	</div>
</section>

<?php
get_footer();
