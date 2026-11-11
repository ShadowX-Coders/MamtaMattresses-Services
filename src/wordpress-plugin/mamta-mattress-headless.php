<?php
/**
 * Plugin Name: Mamta Mattresses Headless REST Bridge
 * Description: Registers Custom Post Types (Services, Reviews, Bookings, Gallery) and provides headless REST API endpoints for Mamta Mattresses Repairing Service website.
 * Version: 1.0.0
 * Author: Mamta Mattresses Repairing Service Engineering
 * Author URI: https://mamtamattresses.com
 * License: GPL2
 */

if (!defined('ABSPATH')) {
    exit;
}

// 1. Register Custom Post Types
function mmr_register_custom_post_types() {
    // Services Post Type
    register_post_type('mmr_service', [
        'labels' => [
            'name' => __('Services', 'mamta-mattress'),
            'singular_name' => __('Service', 'mamta-mattress'),
            'add_new_item' => __('Add New Mattress Service', 'mamta-mattress'),
            'edit_item' => __('Edit Mattress Service', 'mamta-mattress'),
        ],
        'public' => true,
        'has_archive' => false,
        'show_in_rest' => true,
        'rest_base' => 'services',
        'menu_icon' => 'dashicons-hammer',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
    ]);

    // Reviews Post Type
    register_post_type('mmr_review', [
        'labels' => [
            'name' => __('Customer Reviews', 'mamta-mattress'),
            'singular_name' => __('Review', 'mamta-mattress'),
            'add_new_item' => __('Add Customer Review', 'mamta-mattress'),
            'edit_item' => __('Edit Review', 'mamta-mattress'),
        ],
        'public' => true,
        'has_archive' => false,
        'show_in_rest' => true,
        'rest_base' => 'reviews',
        'menu_icon' => 'dashicons-star-filled',
        'supports' => ['title', 'editor', 'custom-fields'],
    ]);

    // Booking Requests Post Type
    register_post_type('mmr_booking', [
        'labels' => [
            'name' => __('Repair Bookings', 'mamta-mattress'),
            'singular_name' => __('Booking Request', 'mamta-mattress'),
            'add_new_item' => __('Add Booking', 'mamta-mattress'),
            'edit_item' => __('View / Edit Booking', 'mamta-mattress'),
        ],
        'public' => false,
        'show_ui' => true,
        'show_in_rest' => true,
        'menu_icon' => 'dashicons-calendar-alt',
        'supports' => ['title', 'editor', 'custom-fields'],
    ]);
}
add_action('init', 'mmr_register_custom_post_types');

// 2. Custom REST API Routes
function mmr_register_rest_routes() {
    register_rest_route('mmr/v1', '/services', [
        'methods' => 'GET',
        'callback' => 'mmr_get_services_endpoint',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route('mmr/v1', '/reviews', [
        'methods' => 'GET',
        'callback' => 'mmr_get_reviews_endpoint',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route('mmr/v1', '/reviews', [
        'methods' => 'POST',
        'callback' => 'mmr_submit_review_endpoint',
        'permission_callback' => '__return_true',
    ]);

    register_rest_route('mmr/v1', '/bookings', [
        'methods' => 'POST',
        'callback' => 'mmr_submit_booking_endpoint',
        'permission_callback' => '__return_true',
    ]);
}
add_action('rest_api_init', 'mmr_register_rest_routes');

// Endpoint Callbacks
function mmr_get_services_endpoint($request) {
    $posts = get_posts([
        'post_type' => 'mmr_service',
        'numberposts' => -1,
        'post_status' => 'publish',
    ]);

    $data = [];
    foreach ($posts as $post) {
        $data[] = [
            'id' => $post->post_name,
            'name' => $post->post_title,
            'category' => get_post_meta($post->ID, '_mmr_category', true) ?: 'Mattress Repair',
            'shortDesc' => $post->post_excerpt ?: wp_trim_words($post->post_content, 20),
            'fullDesc' => apply_filters('the_content', $post->post_content),
            'benefits' => get_post_meta($post->ID, '_mmr_benefits', true) ?: [],
            'estimatedDuration' => get_post_meta($post->ID, '_mmr_duration', true) ?: '2 - 3 Hours',
            'iconName' => get_post_meta($post->ID, '_mmr_icon', true) ?: 'Activity'
        ];
    }
    return rest_ensure_response($data);
}

function mmr_get_reviews_endpoint($request) {
    $posts = get_posts([
        'post_type' => 'mmr_review',
        'numberposts' => 50,
        'post_status' => 'publish',
    ]);

    $data = [];
    foreach ($posts as $post) {
        $data[] = [
            'id' => (string)$post->ID,
            'authorName' => $post->post_title,
            'rating' => (int)get_post_meta($post->ID, '_mmr_rating', true) ?: 5,
            'reviewText' => $post->post_content,
            'serviceUsed' => get_post_meta($post->ID, '_mmr_service_used', true) ?: 'Mattress Repair',
            'puneLocality' => get_post_meta($post->ID, '_mmr_locality', true) ?: 'Pune',
            'date' => get_the_date('Y-m-d', $post->ID),
            'status' => 'Approved',
            'isFeatured' => (bool)get_post_meta($post->ID, '_mmr_featured', true)
        ];
    }
    return rest_ensure_response($data);
}

function mmr_submit_review_endpoint($request) {
    $params = $request->get_json_params();
    $name = sanitize_text_field($params['authorName'] ?? 'Customer');
    $rating = intval($params['rating'] ?? 5);
    $text = sanitize_textarea_field($params['reviewText'] ?? '');
    $service = sanitize_text_field($params['serviceUsed'] ?? 'Mattress Repair');
    $locality = sanitize_text_field($params['puneLocality'] ?? 'Pune');

    $post_id = wp_insert_post([
        'post_title' => $name,
        'post_content' => $text,
        'post_type' => 'mmr_review',
        'post_status' => 'pending', // Held for owner approval in WP admin
    ]);

    if (!is_wp_error($post_id)) {
        update_post_meta($post_id, '_mmr_rating', $rating);
        update_post_meta($post_id, '_mmr_service_used', $service);
        update_post_meta($post_id, '_mmr_locality', $locality);
        return rest_ensure_response(['success' => true, 'id' => $post_id, 'message' => 'Review submitted for moderation']);
    }

    return new WP_Error('save_failed', 'Could not save review', ['status' => 500]);
}

function mmr_submit_booking_endpoint($request) {
    $params = $request->get_json_params();
    $ref = sanitize_text_field($params['referenceNumber'] ?? 'MMR-' . time());
    $name = sanitize_text_field($params['fullName'] ?? 'Customer');
    $mobile = sanitize_text_field($params['mobileNumber'] ?? '');
    $whatsapp = sanitize_text_field($params['whatsappNumber'] ?? $mobile);
    $service = sanitize_text_field($params['serviceName'] ?? 'Mattress Repair');
    $area = sanitize_text_field($params['puneArea'] ?? 'Pune');
    $address = sanitize_textarea_field($params['fullAddress'] ?? '');
    $date = sanitize_text_field($params['preferredDate'] ?? '');
    $slot = sanitize_text_field($params['preferredTimeSlot'] ?? '');
    $desc = sanitize_textarea_field($params['problemDescription'] ?? '');

    $content = sprintf(
        "Ref: %s\nCustomer: %s\nMobile: %s\nWhatsApp: %s\nService: %s\nArea: %s\nAddress: %s\nPreferred Date: %s (%s)\nProblem: %s",
        $ref, $name, $mobile, $whatsapp, $service, $area, $address, $date, $slot, $desc
    );

    $post_id = wp_insert_post([
        'post_title' => "Booking Request: {$ref} - {$name} ({$area})",
        'post_content' => $content,
        'post_type' => 'mmr_booking',
        'post_status' => 'publish',
    ]);

    if (!is_wp_error($post_id)) {
        update_post_meta($post_id, '_mmr_ref', $ref);
        update_post_meta($post_id, '_mmr_mobile', $mobile);
        update_post_meta($post_id, '_mmr_whatsapp', $whatsapp);
        update_post_meta($post_id, '_mmr_area', $area);
        update_post_meta($post_id, '_mmr_status', 'Pending');

        // Send Email Notification to Business Owner
        $to = 'SATISHLASHKAR219@GMAIL.COM';
        $subject = "New At-Home Mattress Repair Request: {$ref} - {$name}";
        $headers = ['Content-Type: text/plain; charset=UTF-8'];
        wp_mail($to, $subject, $content, $headers);

        return rest_ensure_response(['success' => true, 'referenceNumber' => $ref]);
    }

    return new WP_Error('booking_failed', 'Could not record booking', ['status' => 500]);
}
