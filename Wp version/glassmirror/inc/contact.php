<?php
/**
 * Appointment form endpoint (was app/api/contact/route.ts).
 *
 * POST multipart to /wp-json/glassmirror/v1/appointment. Delivery uses
 * wp_mail(), so whatever SMTP plugin the site runs applies. Recipients come
 * from the Customizer (Glass & Mirror settings) and default to the business
 * email.
 */

defined( 'ABSPATH' ) || exit;

const GM_MAX_PHOTOS      = 3;
const GM_MAX_PHOTO_BYTES = 1258291; // 1.2 MB, same limit the form checks in assets/js/theme.js.

add_action(
	'rest_api_init',
	function () {
		register_rest_route(
			'glassmirror/v1',
			'/appointment',
			array(
				'methods'             => 'POST',
				'callback'            => 'gm_handle_appointment',
				'permission_callback' => '__return_true', // Public form; the honeypot filters bots.
			)
		);
	}
);

function gm_handle_appointment( WP_REST_Request $request ) {
	$b     = gm_business();
	$ok    = array( 'message' => 'Your request is in. We will be in touch shortly.' );
	$field = function ( $key ) use ( $request ) {
		return trim( (string) $request->get_param( $key ) );
	};

	// Honeypot: humans never see this field. Bots get a success they learn nothing from.
	if ( '' !== $field( 'company' ) ) {
		return $ok;
	}

	$data = array(
		'name'    => sanitize_text_field( $field( 'name' ) ),
		'phone'   => sanitize_text_field( $field( 'phone' ) ),
		'email'   => sanitize_email( $field( 'email' ) ),
		'city'    => sanitize_text_field( $field( 'city' ) ),
		'service' => sanitize_text_field( $field( 'service' ) ),
		'details' => sanitize_textarea_field( $field( 'details' ) ),
	);

	$lengths = array(
		'name'    => array( 2, 80 ),
		'phone'   => array( 7, 30 ),
		'city'    => array( 2, 80 ),
		'service' => array( 2, 100 ),
		'details' => array( 12, 2000 ),
	);
	$valid   = ( '' === $field( 'email' ) || ( is_email( $data['email'] ) && mb_strlen( $data['email'] ) <= 160 ) );
	foreach ( $lengths as $key => list( $min, $max ) ) {
		$length = mb_strlen( $data[ $key ] );
		$valid  = $valid && $length >= $min && $length <= $max;
	}
	if ( ! $valid ) {
		return new WP_REST_Response( array( 'message' => 'Please complete the required fields before sending.' ), 400 );
	}

	$photos = gm_appointment_photos( $request->get_file_params()['photos'] ?? null );
	if ( is_string( $photos ) ) {
		return new WP_REST_Response( array( 'message' => $photos ), 400 );
	}

	$recipients = array_filter( array_map( 'trim', explode( ',', get_option( 'gm_lead_email' ) ?: $b['email'] ) ), 'is_email' );
	$text       = implode(
		"\n",
		array(
			"Name: {$data['name']}",
			"Phone: {$data['phone']}",
			'Email: ' . ( $data['email'] ?: 'Not provided' ),
			"City: {$data['city']}",
			"Service: {$data['service']}",
			'Photos attached: ' . count( $photos ),
			'',
			$data['details'],
		)
	);

	$sent = wp_mail(
		$recipients,
		"Appointment request: {$data['service']} in {$data['city']}",
		$text,
		array( 'Reply-To: ' . ( $data['email'] ?: $b['email'] ) ),
		$photos
	);

	if ( ! $sent ) {
		return new WP_REST_Response( array( 'message' => "We could not send the request. Please call us at {$b['phone']}." ), 502 );
	}
	return $ok;
}

/**
 * Validates the uploaded photos. Returns wp_mail attachments keyed by the
 * visitor's file name (WordPress 6.2+), or an error message string.
 */
function gm_appointment_photos( $files ) {
	if ( empty( $files['name'] ) ) {
		return array();
	}

	// photos[] arrives as parallel arrays; a single file as scalars.
	$count = is_array( $files['name'] ) ? count( $files['name'] ) : 1;
	$pick  = function ( $key, $i ) use ( $files ) {
		return is_array( $files[ $key ] ) ? $files[ $key ][ $i ] : $files[ $key ];
	};

	$attachments = array();
	for ( $i = 0; $i < $count; $i++ ) {
		if ( UPLOAD_ERR_NO_FILE === (int) $pick( 'error', $i ) ) {
			continue;
		}
		if ( count( $attachments ) >= GM_MAX_PHOTOS ) {
			return 'Please attach no more than ' . GM_MAX_PHOTOS . ' photos.';
		}

		$name = (string) $pick( 'name', $i );
		$type = (string) $pick( 'type', $i );
		$tmp  = (string) $pick( 'tmp_name', $i );

		if ( UPLOAD_ERR_OK !== (int) $pick( 'error', $i ) || ! is_uploaded_file( $tmp ) ) {
			return 'A photo could not be uploaded. Please try again.';
		}
		if ( ! in_array( $type, array( 'image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif' ), true ) && ! preg_match( '/\.(jpe?g|png|webp|heic|heif)$/i', $name ) ) {
			return 'Photos must be JPG, PNG, WEBP, or HEIC.';
		}
		if ( (int) $pick( 'size', $i ) > GM_MAX_PHOTO_BYTES ) {
			return 'Each photo must be under 1.2 MB.';
		}

		$filename = sanitize_file_name( $name );
		if ( '' === $filename || isset( $attachments[ $filename ] ) ) {
			$filename = 'photo-' . ( $i + 1 ) . '-' . $filename;
		}
		$attachments[ $filename ] = $tmp;
	}

	return $attachments;
}
