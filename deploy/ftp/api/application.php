<?php
declare(strict_types=1);

/**
 * Apply page: Expression of Interest / Full Programme Application.
 * Mirrors the original Next.js route /api/application.
 * URL /api/application is routed here by the .htaccess in the site root.
 */

require __DIR__ . '/upec-forms.php';

upec_require_post();

try {
    $data = upec_json_input();
    $applicationType = upec_str($data['applicationType'] ?? 'eoi');
    $name = upec_str($data['name'] ?? null);
    $email = upec_str($data['email'] ?? null);
    $phone = upec_str($data['phone'] ?? null);
    $programme = upec_str($data['programme'] ?? null);
    $location = upec_str($data['location'] ?? null);
    $qualification = upec_str($data['qualification'] ?? null);
    $applicantType = upec_str($data['applicantType'] ?? null);
    $documentName = upec_str($data['documentName'] ?? null);
    $message = upec_str($data['message'] ?? null);
    $declaration = upec_str($data['declaration'] ?? null);

    if ($name === '' || $email === '' || $programme === '') {
        upec_respond(['success' => false, 'error' => 'Please fill in all required fields.'], 400);
    }
    if (!upec_email_valid($email)) {
        upec_respond(['success' => false, 'error' => 'Please enter a valid email address.'], 400);
    }

    $isFull = $applicationType === 'full';
    $kind = $isFull ? 'Programme Application' : 'Expression of Interest';
    $reference = upec_reference($isFull ? 'UPEC-APP' : 'UPEC-EOI');

    $mail = upec_build_form_email(
        'New ' . $kind,
        'New ' . $kind . ' - ' . ($name !== '' ? $name : 'New Applicant') . ' (' . $reference . ')',
        $reference,
        [
            [
                'title' => 'Applicant Details',
                'rows' => [
                    ['Submission Type', $kind],
                    ['Full Name', $name],
                    ['Email Address', $email],
                    ['Phone Number', $phone],
                    ['Location', $location],
                    ['Applicant Type', $applicantType],
                ],
            ],
            [
                'title' => 'Programme',
                'rows' => [
                    ['Programme of Interest', $programme],
                    ['Highest Qualification', $qualification],
                    ['Supporting Document', $documentName],
                ],
            ],
            [
                'title' => 'Additional Information',
                'rows' => [
                    ['Message', $message],
                    ['Declaration Accepted', $declaration !== '' ? 'Yes' : ''],
                ],
            ],
        ],
        'This ' . strtolower($kind) . ' was submitted via the UPEC Digital Campus Apply page.'
    );

    $saved = upec_save_submission('application', $reference, $data);
    $emailResult = upec_send_mail($mail['subject'], $mail['html'], $mail['text'], $email);

    if (!$saved && !$emailResult['sent']) {
        error_log('UPEC application failed. Email error: ' . $emailResult['error']);
        upec_respond(
            ['success' => false, 'error' => 'We could not submit your application right now. Please try again shortly.'],
            500
        );
    }

    upec_respond([
        'success' => true,
        'reference' => $reference,
        'message' => $isFull
            ? 'Your application has been submitted successfully.'
            : 'Your expression of interest has been received.',
    ]);
} catch (Throwable $e) {
    error_log('UPEC application error: ' . $e->getMessage());
    upec_respond(['success' => false, 'error' => 'Something went wrong. Please try again.'], 500);
}
