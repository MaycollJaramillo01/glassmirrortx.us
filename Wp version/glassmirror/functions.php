<?php
/**
 * Martinez Orlyn Glass & Mirror theme.
 *
 * inc/helpers.php  content access + render helpers
 * inc/routes.php   virtual routes for the site pages (/services/…, /service-areas/…)
 * inc/seo.php      titles, meta, JSON-LD, sitemap, analytics
 * inc/contact.php  appointment form endpoint
 */

defined( 'ABSPATH' ) || exit;

require __DIR__ . '/inc/helpers.php';
require __DIR__ . '/inc/routes.php';
require __DIR__ . '/inc/seo.php';
require __DIR__ . '/inc/contact.php';

add_action(
	'after_setup_theme',
	function () {
		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'responsive-embeds' );
		add_theme_support( 'html5', array( 'search-form', 'gallery', 'caption', 'style', 'script' ) );
	}
);

// Block CSS only for blocks a page actually uses; the site pages use none.
add_filter( 'should_load_separate_core_block_assets', '__return_true' );

add_action(
	'wp_enqueue_scripts',
	function () {
		$version = wp_get_theme()->get( 'Version' );
		$deps    = array();

		// The service-area map only appears on the home page.
		if ( 'home' === gm_route_name() ) {
			wp_enqueue_style( 'leaflet', gm_asset( 'vendor/leaflet/leaflet.css' ), array(), '1.9.4' );
			wp_register_script( 'leaflet', gm_asset( 'vendor/leaflet/leaflet.js' ), array(), '1.9.4', true );
			$deps[] = 'leaflet';
		}

		wp_enqueue_style( 'glassmirror', gm_asset( 'css/theme.css' ), array(), $version );
		wp_enqueue_script( 'glassmirror', gm_asset( 'js/theme.js' ), $deps, $version, true );
	}
);

// Fonts are self-hosted; preload them like next/font did.
add_action(
	'wp_head',
	function () {
		foreach ( array( 'archivo-700', 'archivo-800', 'plex-400', 'plex-600' ) as $font ) {
			printf( '<link rel="preload" href="%s" as="font" type="font/woff2" crossorigin>' . "\n", esc_url( gm_asset( "fonts/$font.woff2" ) ) );
		}
	},
	1
);

/**
 * Settings that were environment variables on the Next.js site.
 * Appearance → Customize → Glass & Mirror settings.
 */
add_action(
	'customize_register',
	function ( WP_Customize_Manager $customizer ) {
		$customizer->add_section(
			'glassmirror',
			array(
				'title'    => 'Glass & Mirror settings',
				'priority' => 160,
			)
		);

		$fields = array(
			'gm_lead_email'          => array( 'Send appointment requests to', 'Comma-separated addresses. Empty = the business email.' ),
			'gm_gtm_id'              => array( 'Google Tag Manager ID', 'GTM-XXXXXXX. Used instead of GA4 when both are set.' ),
			'gm_ga_id'               => array( 'Google Analytics 4 ID', 'G-XXXXXXXXXX' ),
			'gm_google_verification' => array( 'Search Console verification code', 'The content value of the google-site-verification meta tag.' ),
		);

		foreach ( $fields as $id => list( $label, $description ) ) {
			$customizer->add_setting(
				$id,
				array(
					'type'              => 'option',
					'sanitize_callback' => 'sanitize_text_field',
				)
			);
			$customizer->add_control(
				$id,
				array(
					'section'     => 'glassmirror',
					'label'       => $label,
					'description' => $description,
				)
			);
		}
	}
);
