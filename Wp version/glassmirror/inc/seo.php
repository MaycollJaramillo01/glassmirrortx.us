<?php
/**
 * Titles, meta tags, JSON-LD, sitemap entries and analytics for the site
 * routes. Ported from lib/seo/metadata.ts, lib/schema/index.ts, app/sitemap.ts
 * and app/layout.tsx. Only confirmed facts are emitted.
 */

defined( 'ABSPATH' ) || exit;

/** Absolute URL for a site path, without a trailing slash (matches the Next.js canonicals). */
function gm_abs( string $path ): string {
	return untrailingslashit( home_url() ) . ( '/' === $path ? '' : $path );
}

/** Home page FAQs. Shown on the page and emitted as FAQPage, so both say the same thing. */
function gm_home_faqs(): array {
	$b = gm_business();
	return array(
		array(
			'question' => 'How do I get a price?',
			'answer'   => 'Call or use the appointment form. We look at the opening, glass type and access on site, then price the actual job. Appointments are easy to schedule.',
		),
		array(
			'question' => 'Do you fabricate custom shower enclosures?',
			'answer'   => 'Yes. Shower enclosures and doors are measured to the stall, fabricated to fit, and installed with hardware matched to the opening.',
		),
		array(
			'question' => 'Can you replace a broken window pane?',
			'answer'   => "Call {$b['phone']}. We handle glass installation, repair and reglazing for homes and businesses across Houston and nearby cities.",
		),
		array(
			'question' => 'Do you serve outside Houston?',
			'answer'   => "Yes. Martinez Orlyn Glass & Mirror works within about {$b['radiusMiles']} miles of Houston — including Katy, Sugar Land, Cypress, Spring, Tomball, Humble, Conroe, Alvin, League City and nearby communities.",
		),
	);
}

/**
 * SEO for the current request: title, description, path, image, trail
 * (breadcrumbs, also used by the templates) and page-level schema nodes.
 * Null on normal WordPress content — core or an SEO plugin handles those.
 */
function gm_seo(): ?array {
	static $cache = false;
	if ( false !== $cache ) {
		return $cache;
	}

	if ( is_404() ) {
		return $cache = array(
			'title'   => 'Page Not Found | Martinez Orlyn Glass & Mirror',
			'noindex' => true,
		);
	}

	$route = gm_route();
	if ( ! $route ) {
		return $cache = null;
	}

	$b    = gm_business();
	$home = array(
		'name' => 'Home',
		'href' => '/',
	);
	$item = $route['item'];

	switch ( $route['name'] ) {
		case 'home':
			$seo = array(
				'title'       => 'Glass & Mirror in Houston, TX | Showers, Mirrors & Windows | Martinez Orlyn Glass & Mirror',
				'description' => "Professional glass and mirror service in Houston, TX. Custom shower enclosures, mirrors, windows, solar screens and glass repair for residential and commercial properties. Licensed & insured. Call {$b['phone']}.",
				'path'        => '/',
				'schema'      => array( 'webpage', gm_faq_schema( gm_home_faqs() ) ),
			);
			break;

		case 'about':
			$seo = array(
				'title'       => 'About Martinez Orlyn Glass & Mirror | Houston Glass & Mirror Company',
				'description' => 'Martinez Orlyn Glass & Mirror is a Houston, Texas glass and mirror company for custom showers, mirrors, windows and glass repair. Licensed & insured. Serving Houston and surrounding communities.',
				'path'        => '/about',
				'trail'       => array( $home, array( 'name' => 'About', 'href' => '/about' ) ),
				'schema'      => array( 'webpage', 'breadcrumbs' ),
			);
			break;

		case 'contact':
			$seo = array(
				'title'       => 'Get an Appointment | Martinez Orlyn Glass & Mirror',
				'description' => "Schedule glass and mirror work with Martinez Orlyn Glass & Mirror in Houston, TX and nearby communities. Call {$b['phone']}.",
				'path'        => '/contact',
				'trail'       => array( $home, array( 'name' => 'Contact', 'href' => '/contact' ) ),
				'schema'      => array(),
			);
			break;

		case 'gallery':
			$seo = array(
				'title'       => 'Glass & Mirror Gallery | Project Photos | Martinez Orlyn Glass & Mirror',
				'description' => 'Project photographs from Martinez Orlyn Glass & Mirror in Houston, TX: shower enclosures, mirrors, windows and glass installation work.',
				'path'        => '/gallery',
				'trail'       => array( $home, array( 'name' => 'Gallery', 'href' => '/gallery' ) ),
				'schema'      => array( 'webpage', 'breadcrumbs' ),
			);
			break;

		case 'privacy-policy':
			$seo = array(
				'title'       => "Privacy Policy | {$b['name']}",
				'description' => "Privacy policy for {$b['legalName']}.",
				'path'        => '/privacy-policy',
				'schema'      => array(),
			);
			break;

		case 'services':
			$seo = array(
				'title'       => 'Glass & Mirror Services in Houston, TX | Martinez Orlyn Glass & Mirror',
				'description' => 'Glass and mirror services in Houston, TX: custom shower enclosures, shower doors, mirrors, mirrored walls, windows, double-pane glass, solar screens, installation, repair and reglazing.',
				'path'        => '/services',
				'trail'       => array( $home, array( 'name' => 'Services', 'href' => '/services' ) ),
				'schema'      => array( 'webpage', 'breadcrumbs' ),
			);
			break;

		case 'service':
			$path = "/services/{$item['slug']}";
			// The direct answer leads the FAQPage; an FAQ asking the same thing is dropped.
			$faqs = array( array( 'question' => $item['aeo']['question'], 'answer' => $item['aeo']['answer'] ) );
			foreach ( $item['faq'] as $faq ) {
				if ( $faq['question'] !== $item['aeo']['question'] ) {
					$faqs[] = $faq;
				}
			}
			$seo = array(
				'title'       => $item['seoTitle'],
				'description' => $item['metaDescription'],
				'path'        => $path,
				'image'       => $item['heroImage'],
				'trail'       => array( $home, array( 'name' => 'Services', 'href' => '/services' ), array( 'name' => $item['name'], 'href' => $path ) ),
				'schema'      => array(
					'webpage',
					array(
						'@type'       => 'Service',
						'@id'         => gm_abs( $path ) . '#service',
						'name'        => $item['name'],
						'serviceType' => $item['name'],
						'description' => $item['metaDescription'],
						'provider'    => array( '@id' => gm_abs( '/' ) . '/#business' ),
						'areaServed'  => array( '@type' => 'City', 'name' => "{$b['city']}, {$b['stateCode']}" ),
						'url'         => gm_abs( $path ),
					),
					'breadcrumbs',
					gm_faq_schema( $faqs ),
				),
			);
			break;

		case 'service-areas':
			$seo = array(
				'title'       => 'Glass & Mirror Service Areas | Martinez Orlyn Glass & Mirror',
				'description' => "{$b['name']} serves Houston and nearby communities across Harris, Fort Bend, Montgomery, Brazoria and Galveston counties.",
				'path'        => '/service-areas',
				'trail'       => array( $home, array( 'name' => 'Service Areas', 'href' => '/service-areas' ) ),
				'schema'      => array( 'webpage', 'breadcrumbs' ),
			);
			break;

		case 'service-area':
			$path = "/service-areas/{$item['slug']}";
			$seo  = array(
				'title'       => $item['seoTitle'],
				'description' => $item['metaDescription'],
				'path'        => $path,
				'trail'       => array( $home, array( 'name' => 'Service Areas', 'href' => '/service-areas' ), array( 'name' => "{$item['city']}, {$item['stateCode']}", 'href' => $path ) ),
				'schema'      => array(
					'webpage',
					array(
						'@type'       => 'Service',
						'@id'         => gm_abs( $path ) . '#service',
						'name'        => "Glass & Mirror Service in {$item['city']}, {$item['stateCode']}",
						'serviceType' => 'Glass & Mirror Service',
						'description' => $item['metaDescription'],
						'provider'    => array( '@id' => gm_abs( '/' ) . '/#business' ),
						'areaServed'  => array(
							'@type'            => 'City',
							'name'             => "{$item['city']}, {$item['stateCode']}",
							'containedInPlace' => array( '@type' => 'AdministrativeArea', 'name' => $item['county'] ),
						),
						'url'         => gm_abs( $path ),
					),
					'breadcrumbs',
					gm_faq_schema( $item['faq'] ),
				),
			);
			break;

		default:
			return $cache = null;
	}

	$seo['image'] = $seo['image'] ?? gm_photo( 'heroGlass' );

	// Expand the shared nodes now that title, path and trail are known.
	foreach ( $seo['schema'] as $i => $node ) {
		if ( 'webpage' === $node ) {
			$url                 = gm_abs( $seo['path'] );
			$seo['schema'][ $i ] = array(
				'@type'       => 'WebPage',
				'@id'         => "$url#webpage",
				'url'         => $url,
				'name'        => $seo['title'],
				'description' => $seo['description'],
				'isPartOf'    => array( '@id' => gm_abs( '/' ) . '/#website' ),
				'about'       => array( '@id' => gm_abs( '/' ) . '/#business' ),
				'inLanguage'  => 'en-US',
			);
		} elseif ( 'breadcrumbs' === $node ) {
			$list = array();
			foreach ( $seo['trail'] as $position => $crumb ) {
				$list[] = array(
					'@type'    => 'ListItem',
					'position' => $position + 1,
					'name'     => $crumb['name'],
					'item'     => gm_abs( $crumb['href'] ),
				);
			}
			$seo['schema'][ $i ] = array(
				'@type'           => 'BreadcrumbList',
				'itemListElement' => $list,
			);
		}
	}

	return $cache = $seo;
}

function gm_faq_schema( array $faqs ): array {
	return array(
		'@type'      => 'FAQPage',
		'mainEntity' => array_map(
			function ( $faq ) {
				return array(
					'@type'          => 'Question',
					'name'           => $faq['question'],
					'acceptedAnswer' => array( '@type' => 'Answer', 'text' => $faq['answer'] ),
				);
			},
			$faqs
		),
	);
}

/** LocalBusiness + WebSite nodes, printed on every page. */
function gm_site_schema(): array {
	$b     = gm_business();
	$site  = gm_abs( '/' );
	$offer = function ( $name, $slug ) use ( $site ) {
		return array(
			'@type'       => 'Offer',
			'itemOffered' => array( '@type' => 'Service', 'name' => $name, 'url' => "$site/services/$slug" ),
		);
	};
	$contact = function ( $type ) use ( $b ) {
		return array(
			'@type'             => 'ContactPoint',
			'telephone'         => $b['phoneHref'],
			'contactType'       => $type,
			'areaServed'        => 'US-TX',
			'availableLanguage' => array( 'English', 'Spanish' ),
		);
	};

	$area_served = array( array( '@type' => 'City', 'name' => "{$b['city']}, {$b['stateCode']}" ) );
	foreach ( $b['counties'] as $county ) {
		$area_served[] = array( '@type' => 'AdministrativeArea', 'name' => "$county, {$b['stateCode']}" );
	}

	$business = array(
		'@type'                     => 'HomeAndConstructionBusiness',
		'@id'                       => "$site/#business",
		'name'                      => $b['legalName'],
		'alternateName'             => array( 'Martinez Orlyn', 'Martinez Orlyn Glass Mirror' ),
		'legalName'                 => $b['legalName'],
		'url'                       => $site,
		'logo'                      => gm_asset( 'images/logo.png' ),
		'image'                     => gm_asset( gm_photo( 'heroGlass' )['src'] ),
		'telephone'                 => $b['phone'],
		'email'                     => $b['email'],
		'slogan'                    => $b['tagline'],
		'description'               => 'Glass and mirror services for residential and commercial properties in Houston, Texas and surrounding communities — custom shower enclosures, mirrors, windows, solar screens and glass repair.',
		'disambiguatingDescription' => 'Glass and mirror installation and repair only. Not a tree service, landscaping company, land-clearing contractor or arborist.',
		'identifier'                => array( '@type' => 'PropertyValue', 'name' => 'License', 'value' => $b['license'] ),
		'sameAs'                    => array_values( array_filter( array_merge( array_values( $b['social'] ), array( $b['googleMaps'], $b['whatsapp'] ) ) ) ),
		'aggregateRating'           => array(
			'@type'       => 'AggregateRating',
			'ratingValue' => $b['googleRating'],
			'reviewCount' => $b['googleReviewCount'],
			'bestRating'  => 5,
			'worstRating' => 1,
		),
		'openingHours'              => $b['openingHours'],
		'address'                   => array(
			'@type'           => 'PostalAddress',
			'streetAddress'   => $b['streetAddress'],
			'addressLocality' => $b['city'],
			'addressRegion'   => $b['stateCode'],
			'postalCode'      => $b['zip'],
			'addressCountry'  => 'US',
		),
		'areaServed'                => $area_served,
		'contactPoint'              => array( $contact( 'customer service' ), $contact( 'appointments' ) ),
		'knowsAbout'                => array( 'Custom shower enclosures', 'Shower doors', 'Custom mirrors', 'Mirrored walls', 'Window glass', 'Door glass', 'Double-pane glass', 'Glass repair and reglazing', 'Solar screens' ),
		'hasOfferCatalog'           => array(
			'@type'           => 'OfferCatalog',
			'name'            => 'Glass and mirror services',
			'itemListElement' => array(
				array( '@type' => 'OfferCatalog', 'name' => 'Bathroom glass', 'itemListElement' => array( $offer( 'Custom shower enclosures', 'custom-shower-enclosures' ), $offer( 'Shower doors', 'shower-doors' ) ) ),
				array( '@type' => 'OfferCatalog', 'name' => 'Mirrors', 'itemListElement' => array( $offer( 'Custom mirrors', 'custom-mirrors' ), $offer( 'Mirrored walls', 'mirrored-walls' ) ) ),
				array( '@type' => 'OfferCatalog', 'name' => 'Windows, doors and screens', 'itemListElement' => array( $offer( 'Windows and doors', 'windows-and-doors' ), $offer( 'Double-pane windows', 'double-pane-windows' ), $offer( 'Solar screens', 'solar-screens' ) ) ),
				array( '@type' => 'OfferCatalog', 'name' => 'Glass services', 'itemListElement' => array( $offer( 'Glass installation and repair', 'glass-installation-repair' ), $offer( 'Reglazing', 'reglazing' ) ) ),
			),
		),
	);

	$website = array(
		'@type'       => 'WebSite',
		'@id'         => "$site/#website",
		'url'         => $site,
		'name'        => $b['legalName'],
		'description' => 'Official website for Martinez Orlyn Glass & Mirror — Houston glass and mirror services for showers, mirrors, windows and glass repair.',
		'publisher'   => array( '@id' => "$site/#business" ),
		'inLanguage'  => 'en-US',
		'about'       => array( '@id' => "$site/#business" ),
	);

	return array( $business, $website );
}

function gm_print_graph( array $nodes ): void {
	echo '<script type="application/ld+json">' . wp_json_encode(
		array(
			'@context' => 'https://schema.org',
			'@graph'   => $nodes,
		),
		JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG
	) . "</script>\n";
}

// Priority 99 so an SEO plugin's title (Rank Math uses 30) doesn't replace it.
add_filter(
	'pre_get_document_title',
	function ( $title ) {
		$seo = gm_seo();
		return $seo ? $seo['title'] : $title;
	},
	99
);

// Rank Math, active on the live site, prints its own description, canonical,
// Open Graph and schema for a static front page. On pages this theme describes,
// the theme's tags are the only ones, so drop Rank Math's and core's canonical.
add_action(
	'wp',
	function () {
		if ( gm_seo() ) {
			remove_all_actions( 'rank_math/head' );
			remove_action( 'wp_head', 'rel_canonical' );
		}
	}
);

add_filter(
	'wp_robots',
	function ( $robots ) {
		$seo = gm_seo();
		if ( $seo && ! empty( $seo['noindex'] ) ) {
			$robots['noindex'] = true;
			$robots['follow']  = true;
		}
		return $robots;
	}
);

add_action(
	'wp_head',
	function () {
		$b   = gm_business();
		$seo = gm_seo();

		echo '<meta name="theme-color" content="#0a1218">' . "\n";
		echo '<meta name="format-detection" content="telephone=yes, address=no, email=yes">' . "\n";
		if ( ! has_site_icon() ) {
			printf( '<link rel="icon" href="%s">' . "\n", esc_url( gm_asset( 'images/logo.png' ) ) );
		}
		// Primary llms.txt discovery for agents.
		printf( '<link rel="describedby" href="%s" type="text/markdown" title="LLM site index">' . "\n", esc_url( gm_url( '/llms.txt' ) ) );
		printf( '<link rel="alternate" href="%s" type="text/plain" title="LLM full site context">' . "\n", esc_url( gm_url( '/llms-full.txt' ) ) );

		$verification = get_option( 'gm_google_verification' );
		if ( $verification ) {
			printf( '<meta name="google-site-verification" content="%s">' . "\n", esc_attr( $verification ) );
		}

		if ( $seo && ! empty( $seo['description'] ) ) {
			$url   = gm_abs( $seo['path'] );
			$image = $seo['image'];
			$meta  = array(
				array( 'name', 'description', $seo['description'] ),
				array( 'property', 'og:type', 'website' ),
				array( 'property', 'og:locale', 'en_US' ),
				array( 'property', 'og:site_name', $b['legalName'] ),
				array( 'property', 'og:title', $seo['title'] ),
				array( 'property', 'og:description', $seo['description'] ),
				array( 'property', 'og:url', $url ),
				array( 'property', 'og:image', gm_asset( $image['src'] ) ),
				array( 'property', 'og:image:width', $image['width'] ),
				array( 'property', 'og:image:height', $image['height'] ),
				array( 'property', 'og:image:alt', $image['alt'] ),
				array( 'name', 'twitter:card', 'summary_large_image' ),
				array( 'name', 'twitter:title', $seo['title'] ),
				array( 'name', 'twitter:description', $seo['description'] ),
				array( 'name', 'twitter:image', gm_asset( $image['src'] ) ),
				array( 'name', 'ai:domain_category', 'glass-and-mirror-services' ),
				array( 'name', 'ai:not_category', 'tree-service,landscaping,land-clearing' ),
			);
			printf( '<link rel="canonical" href="%s">' . "\n", esc_url( $url ) );
			foreach ( $meta as list( $attr, $key, $value ) ) {
				printf( '<meta %s="%s" content="%s">' . "\n", $attr, esc_attr( $key ), esc_attr( (string) $value ) );
			}
		}

		gm_print_graph( gm_site_schema() );
		if ( $seo && ! empty( $seo['schema'] ) ) {
			gm_print_graph( $seo['schema'] );
		}

		// Analytics stay off until an ID is configured in the Customizer.
		$gtm = get_option( 'gm_gtm_id' );
		$ga  = get_option( 'gm_ga_id' );
		if ( $gtm ) {
			printf(
				"<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',%s);</script>\n",
				wp_json_encode( $gtm )
			);
		} elseif ( $ga ) {
			printf(
				'<script async src="https://www.googletagmanager.com/gtag/js?id=%s"></script>' . "\n" . '<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config",%s);</script>' . "\n",
				rawurlencode( $ga ),
				wp_json_encode( $ga )
			);
		}
	},
	2
);

// Site routes in the core sitemap (/wp-sitemap.xml). Core already lists the front page.
add_action(
	'init',
	function () {
		if ( ! function_exists( 'wp_register_sitemap_provider' ) ) {
			return;
		}
		wp_register_sitemap_provider(
			'site',
			new class() extends WP_Sitemaps_Provider {
				public function __construct() {
					$this->name        = 'site';
					$this->object_type = 'site';
				}

				public function get_url_list( $page_num, $object_subtype = '' ) {
					$paths = array( '/services', '/service-areas', '/gallery', '/about', '/contact', '/privacy-policy' );
					foreach ( gm_content( 'services' ) as $service ) {
						$paths[] = "/services/{$service['slug']}";
					}
					foreach ( gm_content( 'serviceAreas' ) as $area ) {
						$paths[] = "/service-areas/{$area['slug']}";
					}
					return array_map(
						function ( $path ) {
							return array( 'loc' => gm_abs( $path ) );
						},
						$paths
					);
				}

				public function get_max_num_pages( $object_subtype = '' ) {
					return 1;
				}
			}
		);
	}
);
