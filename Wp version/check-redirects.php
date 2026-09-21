<?php
/**
 * php "Wp version/check-redirects.php"
 *
 * The old site's URLs each have to reach a page that exists, in one hop, and
 * the sitemap may only list pages the theme actually serves. Run this after
 * touching the redirect map, the routes or inc/content.json. Lives outside
 * glassmirror/ so it stays out of the theme zip.
 */

define( 'ABSPATH', __DIR__ );

$GLOBALS['gm_theme'] = __DIR__ . '/glassmirror';

// The few WordPress functions inc/ touches while loading.
function add_action( ...$args ) {}
function add_filter( ...$args ) {}
function get_theme_file_path( $path = '' ) {
	return $GLOBALS['gm_theme'] . '/' . $path;
}
function home_url( $path = '/' ) {
	return 'https://glassmirrortx.us' . $path;
}
function untrailingslashit( $value ) {
	return rtrim( $value, '/' );
}

require $GLOBALS['gm_theme'] . '/inc/helpers.php';
require $GLOBALS['gm_theme'] . '/inc/routes.php';
require $GLOBALS['gm_theme'] . '/inc/seo.php';

$failed = 0;
$check  = function ( bool $ok, string $message ) use ( &$failed ) {
	if ( ! $ok ) {
		++$failed;
		echo "FAIL  $message\n";
	}
};

$pages = gm_sitemap_paths();

/*
 * Every URL the old site's sitemap listed, and the page that replaces it.
 * /contact/, /gallery/, /service-areas/ and / are not here: the theme's own
 * routes already answer those paths. /blog/ and its post stay where they are.
 */
$legacy = array(
	'about-martinez-orlyn-glass-mirror' => '/about',
	'glass-mirror'                      => '/services',
	'glass-mirror-services'             => '/services',
	'residential-glass-mirror'          => '/services',
	'custom-showers'                    => '/services/custom-shower-enclosures',
	'custom-shower-enclosures'          => '/services/custom-shower-enclosures',
	'houston-tx'                        => '/service-areas/houston-tx',
	'katy-tx'                           => '/service-areas/katy-tx',
	'sugar-land-tx'                     => '/service-areas/sugar-land-tx',
	'cypress-tx'                        => '/service-areas/cypress-tx',
	'spring-tx'                         => '/service-areas/spring-tx',
	'tomball-tx'                        => '/service-areas/tomball-tx',
	'humble-tx'                         => '/service-areas/humble-tx',
	'conroe-tx'                         => '/service-areas/conroe-tx',
	'alvin-tx'                          => '/service-areas/alvin-tx',
	'league-city-tx'                    => '/service-areas/league-city-tx',
);

foreach ( $legacy as $slug => $expected ) {
	$target = gm_legacy_target( $slug );
	$check( $target === $expected, "/$slug/ goes to " . ( $target ? $target : 'nowhere' ) . ", expected $expected" );
	$check( in_array( $expected, $pages, true ), "$expected is not a page the theme serves" );

	// A target that itself redirects would make Google follow a chain. Only
	// single-segment paths reach the redirect at all.
	$rest = trim( $expected, '/' );
	$check( false !== strpos( $rest, '/' ) || '' === gm_legacy_target( $rest ), "$expected redirects again" );
}

// Paths the redirect must keep its hands off.
foreach ( array( 'blog', 'the-benefits-of-custom-shower-enclosures', 'about', 'services', 'contact' ) as $slug ) {
	$check( '' === gm_legacy_target( $slug ), "/$slug/ should not redirect" );
}

// The sitemap may only name pages a route answers.
foreach ( $pages as $path ) {
	$request = trim( $path, '/' );
	$served  = '' === $request;
	foreach ( GM_ROUTES as $regex => $name ) {
		if ( ! preg_match( "#$regex#", $request, $matches ) ) {
			continue;
		}
		$served = 'service' === $name ? (bool) gm_service( $matches[1] )
			: ( 'service-area' === $name ? (bool) gm_area( $matches[1] ) : true );
		break;
	}
	$check( $served, "the sitemap lists $path but no route answers it" );
}

$total = count( $legacy ) * 3 + 5 + count( $pages );
echo $failed ? "\n$failed of $total checks failed\n" : "$total checks passed\n";
exit( $failed ? 1 : 0 );
