<?php
/**
 * /about (app/about/page.tsx).
 */

defined( 'ABSPATH' ) || exit;

$b        = gm_business();
$services = gm_content( 'services' );
$stats    = array(
	array( $b['experienceValue'], $b['experienceLabel'] ),
	array( 'Licensed', "License {$b['license']}" ),
	array( "{$b['radiusMiles']} miles", 'Houston coverage' ),
	array( (string) count( $services ), 'Services offered' ),
);

get_header();

ob_start();
?>
<dl class="mt-14 grid gap-x-8 gap-y-8 border-t border-bone/15 pt-9 sm:grid-cols-2 lg:grid-cols-4">
	<?php foreach ( $stats as $i => list( $value, $label ) ) : ?>
		<div<?= gm_reveal( 'up', $i * 70 ) ?> class="lg:border-l lg:border-bone/15 lg:pl-8 lg:first:border-l-0 lg:first:pl-0">
			<dt class="sr-only"><?= esc_html( $label ) ?></dt>
			<dd>
				<p class="font-display text-[2.25rem] leading-none font-extrabold tracking-[-0.04em] text-bone"><?= esc_html( $value ) ?></p>
				<p class="mt-2.5 text-[0.72rem] font-bold tracking-[0.14em] text-bone/55 uppercase"><?= esc_html( $label ) ?></p>
			</dd>
		</div>
	<?php endforeach; ?>
</dl>
<?php
get_template_part(
	'template-parts/page-hero',
	null,
	array(
		'eyebrow'  => "About {$b['name']}",
		'title'    => 'A Houston shop for glass <span class="text-gold">that fits the room.</span>',
		'lead'     => "{$b['name']} is a glass and mirror company based in Houston, Texas, working across Harris, Fort Bend, Montgomery, Brazoria and Galveston counties. {$b['experience']} of hands-on work, licensed and insured, scheduled by appointment.",
		'image'    => gm_photo( 'aboutShop' ),
		'children' => ob_get_clean(),
	)
);
?>

<section class="<?= gm_space() ?> bg-bone" aria-labelledby="story-heading">
	<div class="<?= gm_container() ?> grid gap-12 lg:grid-cols-12 lg:gap-16">
		<div class="lg:col-span-5">
			<div<?= gm_reveal( 'scale' ) ?> class="relative aspect-[4/5] overflow-hidden">
				<?= gm_img( gm_photo( 'showerEnclosure' ), 'object-cover', array( 'fill' => true ) ) ?>
			</div>
			<div<?= gm_reveal( 'up', 90 ) ?> class="mt-5 flex items-start gap-3 text-[0.85rem] leading-relaxed text-muted">
				<?= gm_icon( 'shield-check', 'mt-0.5 size-4 shrink-0 text-forest' ) ?>
				<span>Licensed &amp; insured. Appointments for residential and commercial glass work.</span>
			</div>
		</div>

		<div class="lg:col-span-6 lg:col-start-7">
			<div<?= gm_reveal() ?>><?= gm_eyebrow( 'Who we are' ) ?></div>
			<div<?= gm_reveal( 'up', 60 ) ?>>
				<h2 id="story-heading" class="home-h2 mt-6 max-w-[18ch] text-charcoal">Houston is home base, not a pin on a map.</h2>
			</div>

			<div<?= gm_reveal( 'up', 120 ) ?>>
				<div class="mt-8 space-y-5 text-[1.02rem] leading-relaxed text-muted">
					<p>
						Houston homes and businesses ask for different kinds of glass. Bathrooms need
						shower enclosures that fit the stall. Interiors need mirrors that open the room.
						Windows and doors need glass that matches the frame — and when a pane fails,
						reglazing has to leave the opening clean.
					</p>
					<p>
						Those are different jobs, and pricing one like the other is how people end up
						with an estimate that does not match the opening. So we come out, measure it, and
						price the work that is actually in front of us before anyone commits.
					</p>
					<p>
						<?= esc_html( $b['experience'] ) ?> in, the range of work covers custom shower enclosures and
						doors, mirrors and mirrored walls, windows, double-pane glass, solar screens, and
						installation, repair and reglazing for homes and commercial spaces.
					</p>
				</div>
			</div>

			<div<?= gm_reveal( 'up', 180 ) ?>>
				<?=
				gm_button(
					esc_html( gm_cta( 'viewWork' ) ),
					gm_url( '/gallery' ),
					array(
						'variant' => 'outline',
						'arrow'   => true,
						'class'   => 'mt-9',
					)
				)
				?>
			</div>
		</div>
	</div>
</section>

<section class="<?= gm_space() ?> relative isolate overflow-hidden bg-charcoal" aria-labelledby="principles-heading">
	<div aria-hidden="true" class="glass-facet pointer-events-none absolute -top-56 -left-40 size-[46rem] text-bone/[0.045]"></div>
	<div aria-hidden="true" class="grain pointer-events-none absolute inset-0"></div>

	<div class="<?= gm_container() ?> relative z-10">
		<div class="max-w-[46rem]">
			<div<?= gm_reveal() ?>><?= gm_eyebrow( 'Mission &amp; vision', 'light' ) ?></div>
			<div<?= gm_reveal( 'up', 60 ) ?>>
				<h2 id="principles-heading" class="home-h2 mt-6 text-bone">What the shop is <span class="text-gold">actually for.</span></h2>
			</div>
		</div>

		<?php get_template_part( 'template-parts/principles' ); ?>
	</div>
</section>

<section class="<?= gm_space( 'tight' ) ?> bg-sand/60" aria-labelledby="what-we-do-heading">
	<div class="<?= gm_container() ?>">
		<div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
			<div class="max-w-[36rem]">
				<div<?= gm_reveal() ?>><?= gm_eyebrow( 'What we do' ) ?></div>
				<div<?= gm_reveal( 'up', 60 ) ?>>
					<h2 id="what-we-do-heading" class="home-h2 mt-6 text-charcoal"><?= count( $services ) ?> services, one shop.</h2>
				</div>
			</div>
			<div<?= gm_reveal( 'up', 110 ) ?>>
				<a href="<?= esc_url( gm_url( '/services' ) ) ?>" class="link-arrow shrink-0 text-charcoal">
					<?= esc_html( gm_cta( 'viewServices' ) ) ?> <?= gm_icon( 'arrow-right', 'size-4', 2.4 ) ?>
				</a>
			</div>
		</div>

		<ul class="mt-12 grid gap-px border-t border-charcoal/15 sm:grid-cols-2 lg:grid-cols-3">
			<?php foreach ( $services as $i => $service ) : ?>
				<li<?= gm_reveal( 'up', $i * 60 ) ?> class="border-b border-charcoal/15 sm:border-r sm:last:border-r-0">
					<a href="<?= esc_url( gm_url( "/services/{$service['slug']}" ) ) ?>" class="group flex h-full flex-col p-7 transition-colors hover:bg-bone">
						<p class="font-display text-[0.7rem] font-extrabold tracking-[0.16em] text-forest uppercase tabular-nums"><?= gm_pad( $i + 1 ) ?></p>
						<h3 class="mt-4 flex items-start justify-between gap-4 font-display text-[1.3rem] font-extrabold tracking-[-0.025em] text-charcoal">
							<?= esc_html( $service['name'] ) ?>
							<?= gm_icon( 'arrow-up-right', 'mt-1 size-4 shrink-0 text-muted-light transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-forest', 2.2 ) ?>
						</h3>
						<p class="mt-3 text-[0.92rem] leading-relaxed text-muted"><?= esc_html( $service['cardSummary'] ) ?></p>
					</a>
				</li>
			<?php endforeach; ?>

			<li<?= gm_reveal( 'up', count( $services ) * 60 ) ?> class="border-b border-charcoal/15">
				<div class="flex h-full flex-col justify-center gap-4 bg-charcoal p-7 text-bone">
					<p class="font-display text-[1.05rem] font-extrabold tracking-tight">Not sure which one you need?</p>
					<a href="<?= esc_attr( gm_tel() ) ?>" data-cta="phone" data-location="about_services" class="inline-flex min-h-[44px] items-center gap-2.5 font-display text-[1.15rem] font-extrabold tracking-tight text-bone transition-colors hover:text-gold">
						<?= gm_icon( 'phone', 'size-4 shrink-0 text-gold', 2.4 ) ?>
						<?= esc_html( $b['phone'] ) ?>
					</a>
				</div>
			</li>
		</ul>
	</div>
</section>

<?php
get_template_part(
	'template-parts/process',
	null,
	array(
		'eyebrow' => 'How we work',
		'heading' => 'Four steps, start to finish',
	)
);
get_template_part( 'template-parts/areas-strip', null, array( 'service_name' => 'Glass and mirror work' ) );
get_template_part(
	'template-parts/contact-cta',
	null,
	array(
		'location' => 'about_cta',
		'title'    => 'Talk to the shop <span class="text-gold">that does the work.</span>',
	)
);

get_footer();
