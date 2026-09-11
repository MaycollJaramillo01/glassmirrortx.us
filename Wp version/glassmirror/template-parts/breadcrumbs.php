<?php
/**
 * Visible breadcrumb trail (components/seo/Breadcrumbs). The matching
 * BreadcrumbList JSON-LD comes from the same trail in inc/seo.php.
 *
 * @var array $args { trail: list of { name, href } }
 */

defined( 'ABSPATH' ) || exit;

$trail = $args['trail'];
$last  = count( $trail ) - 1;
?>
<nav aria-label="Breadcrumb" class="mb-9">
	<ol class="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[0.78rem] tracking-wide text-bone/55">
		<?php foreach ( $trail as $i => $crumb ) : ?>
			<li class="flex items-center gap-1.5">
				<?php if ( $i > 0 ) : ?>
					<?= gm_icon( 'chevron-right', 'size-3 shrink-0 opacity-50' ) ?>
				<?php endif; ?>
				<?php if ( $i === $last ) : ?>
					<span aria-current="page" class="text-bone"><?= esc_html( $crumb['name'] ) ?></span>
				<?php else : ?>
					<a href="<?= esc_url( gm_url( $crumb['href'] ) ) ?>" class="link-underline transition-colors hover:text-bone"><?= esc_html( $crumb['name'] ) ?></a>
				<?php endif; ?>
			</li>
		<?php endforeach; ?>
	</ol>
</nav>
