<?php
declare(strict_types=1);

/**
 * Contact page enquiry -> emails chiekenn@gmail.com (see upec-forms.php).
 * Mirrors the original Next.js route /api/enquiry.
 * URL /api/enquiry is routed here by the .htaccess in the site root.
 */

require __DIR__ . '/upec-forms.php';

upec_require_post();

try {
    $data = upec_json_input();
    $name = upec_str($data['name'] ?? null);
    $email = upec_str($data['email'] ?? null);
    $phone = upec_str($data['phone'] ?? null);
    $subject = upec_str($data['subject'] ?? null);
    $message = upec_str($data['message'] ?? null);

    if ($name === '' || $email === '' || $message === '') {
        upec_respond(['success' => false, 'error' => 'Please fill in all required fields.'], 400);
    }
    if (!upec_email_valid($email)) {
        upec_respond(['success' => false, 'error' => 'Please enter a valid email address.'], 400);
    }

    $mail = upec_build_form_email(
        'New Contact Enquiry',
        'New Contact Enquiry - ' . $name . ($subject !== '' ? ': ' . $subject : ''),
        null,
        [
            [
                'title' => 'Contact Details',
                'rows' => [
                    ['Full Name', $name],
                    ['Email Address', $email],
                    ['Phone Number', $phone],
                ],
            ],
            [
                'title' => 'Message',
                'rows' => [
                    ['Subject', $subject],
                    ['Message', $message],
                ],
            ],
        ],
        'This message was submitted via the UPEC Digital Campus Contact page. Reply directly to this email to respond to the sender.'
    );

    $saved = upec_save_submission('contact-enquiry', 'CONTACT', $data);
    $emailResult = upec_send_mail($mail['subject'], $mail['html'], $mail['text'], $email);

    if (!$saved && !$emailResult['sent']) {
        error_log('UPEC contact enquiry failed. Email error: ' . $emailResult['error']);
        upec_respond(
            ['success' => false, 'error' => 'We could not send your message right now. Please try again shortly.'],
            500
        );
    }

    upec_respond([
        'success' => true,
        'message' => 'Your message has been received. The UPEC team will respond soon.',
    ]);
} catch (Throwable $e) {
    error_log('UPEC enquiry error: ' . $e->getMessage());
    upec_respond(['success' => false, 'error' => 'Something went wrong. Please try again.'], 500);
}
