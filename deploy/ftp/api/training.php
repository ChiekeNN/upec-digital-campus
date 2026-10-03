<?php
declare(strict_types=1);

/**
 * Entrepreneur Training Registration (passport photo attached to the email).
 * Mirrors the original Next.js route /api/application/training.
 * URL /api/application/training is routed here by the root .htaccess.
 */

require __DIR__ . '/upec-forms.php';

upec_require_post();

try {
    $data = upec_json_input();
    $f = static fn (string $key): string => upec_str($data[$key] ?? null);

    $fullName = $f('fullName');
    $email = $f('email');
    $phone = $f('phone');

    if ($fullName === '' || $email === '' || $phone === '') {
        upec_respond(
            ['success' => false, 'error' => 'Please fill in your full name, email address, and phone number.'],
            400
        );
    }
    if (!upec_email_valid($email)) {
        upec_respond(['success' => false, 'error' => 'Please enter a valid email address.'], 400);
    }

    $reference = upec_reference('UPEC-ET');

    $interests = is_array($data['trainingInterests'] ?? null)
        ? array_values(array_filter(array_map('upec_str', $data['trainingInterests'])))
        : [];
    $otherInterest = $f('otherTrainingInterest');
    $interestsText = $interests !== []
        ? implode(', ', $interests) . ($otherInterest !== '' ? ' (Other: ' . $otherInterest . ')' : '')
        : $otherInterest;

    $attachments = [];
    $photo = upec_photo_attachment(
        is_string($data['photo'] ?? null) ? $data['photo'] : null,
        isset($data['photoName']) ? upec_str($data['photoName']) : null,
        $reference
    );
    if ($photo !== null) {
        $attachments[] = $photo;
    }

    $mail = upec_build_form_email(
        'New Entrepreneur Training Registration',
        'New Entrepreneur Training Registration - ' . $fullName . ' (' . $reference . ')',
        $reference,
        [
            [
                'title' => 'Programme Details',
                'rows' => [
                    ['Programme / Organisation', $f('programmeOrganisation')],
                    ['Training Title', $f('trainingTitle')],
                    ['Training Date', $f('trainingDate')],
                    ['Venue', $f('venue')],
                ],
            ],
            [
                'title' => 'A. Personal Information',
                'rows' => [
                    ['Full Name', $fullName],
                    ['Gender', $f('gender')],
                    ['Date of Birth', $f('dateOfBirth')],
                    ['Phone Number', $phone],
                    ['Email Address', $email],
                    ['State of Origin', $f('stateOfOrigin')],
                    ['LGA', $f('lga')],
                    ['Residential Address', $f('residentialAddress')],
                ],
            ],
            [
                'title' => 'B. Educational / Professional Background',
                'rows' => [
                    ['Highest Qualification', $f('highestQualification')],
                    ['Occupation', $f('occupation')],
                    ['Employment Status', $f('employmentStatus')],
                    ['Employment (Other)', $f('employmentOther')],
                ],
            ],
            [
                'title' => 'C. Entrepreneurship Information',
                'rows' => [
                    ['Owns/Operates a Business', $f('ownsBusiness')],
                    ['Business Name', $f('businessName')],
                    ['Type / Nature of Business', $f('businessType')],
                    ['Years in Business', $f('yearsInBusiness')],
                    ['Business Location', $f('businessLocation')],
                    ['Intended Business Type', $f('intendedBusinessType')],
                ],
            ],
            [
                'title' => 'D. Areas of Training Interest',
                'rows' => [['Training Interests', $interestsText]],
            ],
            [
                'title' => 'E. Training Expectations',
                'rows' => [
                    ['Expectations from Training', $f('trainingExpectations')],
                    ['Major Business Challenge', $f('businessChallenge')],
                    ['Wants Further Support', $f('furtherSupport')],
                ],
            ],
            [
                'title' => 'F. Emergency Contact',
                'rows' => [
                    ['Name', $f('emergencyName')],
                    ['Relationship', $f('emergencyRelationship')],
                    ['Phone Number', $f('emergencyPhone')],
                ],
            ],
            [
                'title' => 'G. Declaration',
                'rows' => [
                    ['Declarant Name', $f('declarationName') !== '' ? $f('declarationName') : $fullName],
                    ['Declaration Date', $f('declarationDate')],
                ],
            ],
        ],
        'This registration was submitted via the UPEC Digital Campus Entrepreneur Training Registration form.'
        . ($attachments !== [] ? " The participant's passport photograph is attached to this email." : '')
    );

    $saved = upec_save_submission('entrepreneur-training', $reference, $data);
    $emailResult = upec_send_mail($mail['subject'], $mail['html'], $mail['text'], $email, $attachments);

    if (!$saved && !$emailResult['sent']) {
        error_log('UPEC training registration failed. Email error: ' . $emailResult['error']);
        upec_respond(
            ['success' => false, 'error' => 'We could not submit your registration right now. Please try again shortly.'],
            500
        );
    }

    upec_respond([
        'success' => true,
        'reference' => $reference,
        'emailSent' => $emailResult['sent'],
        'message' => 'Your Entrepreneur Training Registration has been submitted successfully'
            . ($emailResult['sent']
                ? ' and the details have been sent to ' . UPEC_NOTIFICATION_EMAIL . '. '
                : '. ')
            . 'Please keep or print your registration slip for verification at the training venue.',
    ]);
} catch (Throwable $e) {
    error_log('UPEC training registration error: ' . $e->getMessage());
    upec_respond(['success' => false, 'error' => 'Something went wrong. Please try again.'], 500);
}
