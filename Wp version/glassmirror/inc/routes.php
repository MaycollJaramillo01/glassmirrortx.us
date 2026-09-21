<?php
/**
 * Routing. The Next.js pages become virtual routes: each path maps to a
 * `gm_route` query var and a template in templates/, so the whole site works
 * the moment the theme is active — no pages to create in wp-admin.
 * Normal WordPress pages and posts keep working alongside them.
 */

defined( 'ABSPATH' ) || exit;

// Bump when the rules change so they are flushed once on the next request.
const GM_ROUTES_VERSION = '2';

const GM_ROUTES = array(
	'^about/?$'                  => 'about',
	'^contact/?$'                => 'contact',
	'^gallery/?$'                => 'gallery',
	'^privacy-policy/?$'         => 'privacy-policy',
	'^services/?$'               => 'services',
	'^services/([^/]+)/?$'       => 'service',
	'^service-areas/?$'          => 'service-areas',
	'^service-areas/([^/]+)/?$'  => 'service-area',
	'^(llms|llms-full)\.txt$'    => 'llms',
	'^glassmirror-sitemap\.xml$' => 'sitemap',
);

add_filter(
	'query_vars',
	function ( $vars ) {
		$vars[] = 'gm_route';
		$vars[] = 'gm_slug';
		return $vars;
	}
);

add_action(
	'init',
	function () {
		foreach ( GM_ROUTES as $regex => $route ) {
			$slug = false === strpos( $regex, '(' ) ? '' : '&gm_slug=$matches[1]';
			add_rewrite_rule( $regex, "index.php?gm_route=$route$slug", 'top' );
		}

		if ( get_option( 'gm_routes_version' ) !== GM_ROUTES_VERSION ) {
			flush_rewrite_rules( false );
			update_option( 'gm_routes_version', GM_ROUTES_VERSION );
		}
	}
);

// Another theme may have flushed our rules away while it was active.
add_action(
	'after_switch_theme',
	function () {
		delete_option( 'gm_routes_version' );
	}
);

/**
 * The current site route: array( 'name' => …, 'item' => service|area|null ),
 * or null on normal WordPress content. Unknown slugs resolve to '404'.
 * Call after the main query has run.
 */
function gm_route(): ?array {
	$name = get_query_var( 'gm_route' );
	if ( ! $name ) {
		return is_front_page() ? array(
			'name' => 'home',
			'item' => null,
		) : null;
	}

	$item = null;
	if ( 'service' === $name ) {
		$item = gm_service( get_query_var( 'gm_slug' ) );
	} elseif ( 'service-area' === $name ) {
		$item = gm_area( get_query_var( 'gm_slug' ) );
	}

	if ( in_array( $name, array( 'service', 'service-area' ), true ) && ! $item ) {
		$name = '404';
	}

	return array(
		'name' => $name,
		'item' => $item,
	);
}

function gm_route_name(): string {
	$route = gm_route();
	return $route ? $route['name'] : '';
}

// A site route is not the blog index, and it needs no posts query.
add_action(
	'parse_query',
	function ( WP_Query $query ) {
		if ( $query->is_main_query() && $query->get( 'gm_route' ) ) {
			$query->is_home = false;
		}
	}
);

add_filter(
	'posts_pre_query',
	function ( $posts, WP_Query $query ) {
		return $query->is_main_query() && $query->get( 'gm_route' ) ? array() : $posts;
	},
	10,
	2
);

// Site routes answer 200 without posts; unknown service/area slugs answer 404.
add_filter(
	'pre_handle_404',
	function ( $handled ) {
		if ( ! get_query_var( 'gm_route' ) ) {
			return $handled;
		}

		if ( '404' === gm_route_name() ) {
			global $wp_query;
			$wp_query->set_404();
			status_header( 404 );
			nocache_headers();
		} else {
			status_header( 200 );
		}
		return true;
	}
);

// Canonical URLs are printed by inc/seo.php; don't let core rewrite these paths.
add_filter(
	'redirect_canonical',
	function ( $url ) {
		return get_query_var( 'gm_route' ) ? false : $url;
	}
);

// /llms.txt and /llms-full.txt, served from the theme like public/ did.
add_action(
	'template_redirect',
	function () {
		if ( 'llms' !== get_query_var( 'gm_route' ) ) {
			return;
		}
		header( 'Content-Type: text/plain; charset=utf-8' );
		readfile( get_theme_file_path( get_query_var( 'gm_slug' ) . '.txt' ) );
		exit;
	}
);

// /glassmirror-sitemap.xml — the pages below are virtual, so no plugin can find
// them. gm_sitemap_paths() and robots.txt live in inc/seo.php.
add_action(
	'template_redirect',
	function () {
		if ( 'sitemap' !== get_query_var( 'gm_route' ) ) {
			return;
		}
		header( 'Content-Type: application/xml; charset=UTF-8' );
		echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
		echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
		foreach ( gm_sitemap_paths() as $path ) {
			printf( "\t<url><loc>%s</loc></url>\n", esc_url( gm_abs( $path ) ) );
		}
		echo '</urlset>';
		exit;
	}
);

/*
 * Pages from the previous site. Both structures answered 200 for the same
 * search — /houston-tx/ next to /service-areas/houston-tx, /custom-showers/
 * next to /services/custom-shower-enclosures — which split the signals Google
 * had to choose between. Each old path now sends one 301 to the page that
 * covers that intent. City and service paths resolve straight from the content
 * file; the rest are named here. Runs before redirect_canonical (priority 10)
 * and works whether the old page is still published, trashed or already gone.
 */
add_action(
	'template_redirect',
	function () {
		if ( get_query_var( 'gm_route' ) || is_admin() ) {
			return;
		}

		$slug = trim( (string) ( $GLOBALS['wp']->request ?? '' ), '/' );
		if ( '' === $slug || false !== strpos( $slug, '/' ) ) {
			return;
		}

		$target = gm_legacy_target( $slug );
		if ( $target ) {
			wp_safe_redirect( gm_url( $target ), 301 );
			exit;
		}
	},
	0
);

/** The page that now covers an old top-level path, or '' if it is not one of them. */
function gm_legacy_target( string $slug ): string {
	$named = array(
		'about-martinez-orlyn-glass-mirror' => '/about',
		'custom-showers'                    => '/services/custom-shower-enclosures',
		'glass-mirror'                      => '/services',
		'glass-mirror-services'             => '/services',
		'residential-glass-mirror'          => '/services',
	);

	if ( isset( $named[ $slug ] ) ) {
		return $named[ $slug ];
	}
	if ( gm_area( $slug ) ) {
		return "/service-areas/$slug";
	}
	if ( gm_service( $slug ) ) {
		return "/services/$slug";
	}
	return '';
}

// Priority 99: Elementor's page templates and Theme Builder layouts (priority 11)
// would otherwise replace these pages, a static front page built with Elementor included.
add_filter(
	'template_include',
	function ( $template ) {
		$name = gm_route_name();
		if ( 'home' === $name ) {
			return get_theme_file_path( 'front-page.php' );
		}
		return get_query_var( 'gm_route' ) && '404' !== $name ? get_theme_file_path( "templates/$name.php" ) : $template;
	},
	99
);

// Every route above needs pretty permalinks.
add_action(
	'admin_notices',
	function () {
		if ( get_option( 'permalink_structure' ) || ! current_user_can( 'manage_options' ) ) {
			return;
		}
		printf(
			'<div class="notice notice-warning"><p>The Glass &amp; Mirror theme needs pretty permalinks. Choose any option other than “Plain” under <a href="%s">Settings → Permalinks</a>.</p></div>',
			esc_url( admin_url( 'options-permalink.php' ) )
		);
	}
);
