<?php
declare(strict_types=1);

/**
 * Postgraduate Application (passport photo attached to the notification email).
 * Mirrors the original Next.js route /api/application/postgraduate.
 * URL /api/application/postgraduate is routed here by the root .htaccess.
 */

require __DIR__ . '/upec-forms.php';

upec_require_post();

try {
    $data = upec_json_input();
    $f = static fn (string $key): string => upec_str($data[$key] ?? null);

    $programme = $f('programme');
    $name = $f('name');
    $email = $f('email');

    if ($name === '' || $email === '' || $programme === '') {
        upec_respond(['success' => false, 'error' => 'Please fill in all required fields.'], 400);
    }
    if (!upec_email_valid($email)) {
        upec_respond(['success' => false, 'error' => 'Please enter a valid email address.'], 400);
    }

    $reference = upec_reference('UPEC-PG');

    // Education history rows
    $education = is_array($data['education'] ?? null) ? $data['education'] : [];
    $educationRows = [];
    foreach ($education as $entry) {
        if (!is_array($entry)) {
            continue;
        }
        $institution = upec_str($entry['institution'] ?? null);
        $qualification = upec_str($entry['qualification'] ?? null);
        if ($institution === '' && $qualification === '') {
            continue;
        }
        $start = upec_str($entry['startDate'] ?? null);
        $completion = upec_str($entry['completionDate'] ?? null);
        $cgpa = upec_str($entry['cgpa'] ?? null);
        $parts = array_filter([
            $institution,
            $qualification !== '' ? 'Qualification: ' . $qualification : '',
            ($start !== '' || $completion !== '')
                ? 'Period: ' . ($start !== '' ? $start : '?') . ' - ' . ($completion !== '' ? $completion : '?')
                : '',
            $cgpa !== '' ? 'CGPA/Class: ' . $cgpa : '',
        ]);
        $educationRows[] = [upec_str($entry['level'] ?? null) ?: 'Institution', implode("\n", $parts)];
    }

    // Referee rows
    $referees = is_array($data['referees'] ?? null) ? $data['referees'] : [];
    $refereeRows = [];
    $i = 0;
    foreach ($referees as $referee) {
        $i++;
        if (!is_array($referee)) {
            continue;
        }
        $rName = upec_str($referee['name'] ?? null);
        $rAddress = upec_str($referee['address'] ?? null);
        $rEmail = upec_str($referee['email'] ?? null);
        $rPhone = upec_str($referee['phone'] ?? null);
        if ($rName === '' && $rEmail === '' && $rPhone === '') {
            continue;
        }
        $sn = upec_str($referee['sn'] ?? null);
        $refereeRows[] = [
            'Referee ' . ($sn !== '' ? $sn : (string) $i),
            implode("\n", array_filter([$rName, $rAddress, $rEmail, $rPhone])),
        ];
    }

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
        'New Postgraduate Application',
        'New Postgraduate Application - ' . $name . ' (' . $reference . ')',
        $reference,
        [
            [
                'title' => 'Programme',
                'rows' => [
                    ['Programme', $programme],
                    ['Degree Aimed At', $f('degreeAimedAt')],
                    ['Area of Specialisation', $f('areaOfSpecialisation')],
                    ['Research Interest', $f('researchInterest')],
                    ['Mode of Study', $f('modeOfStudy')],
                    ['Hostel Required', $f('hostelRequired')],
                ],
            ],
            [
                'title' => 'Personal Information',
                'rows' => [
                    ['Full Name', $name],
                    ['Former Name', $f('formerName')],
                    ['Date of Birth', $f('dateOfBirth')],
                    ['Place of Birth', $f('placeOfBirth')],
                    ['Marital Status', $f('maritalStatus')],
                    ['Number of Children', $f('numberOfChildren')],
                    ['Nationality', $f('nationality')],
                    ['State of Origin', $f('stateOfOrigin')],
                    ['Home Town', $f('homeTown')],
                    ['Present Employment', $f('presentEmployment')],
                    ['Present Address', $f('presentAddress')],
                    ['Phone Number', $f('phone')],
                    ['Email Address', $email],
                ],
            ],
            [
                'title' => 'Next of Kin',
                'rows' => [
                    ['Name', $f('nokName')],
                    ['Relationship', $f('nokRelationship')],
                    ['Address', $f('nokAddress')],
                    ['Phone Number', $f('nokPhone')],
                ],
            ],
            ['title' => 'Education', 'rows' => $educationRows],
            [
                'title' => 'Academic Details',
                'rows' => [
                    ['CGPA', $f('cgpa')],
                    ['CGPA Scale', $f('cgpaScale')],
                    ['Certificate Received', $f('certificateReceived')],
                    ['Languages Spoken', $f('languageSpoken')],
                    ['Languages Written', $f('languageWritten')],
                ],
            ],
            [
                'title' => 'Sponsor',
                'rows' => [
                    ['Sponsor Name', $f('sponsorName')],
                    ['Sponsor Address', $f('sponsorAddress')],
                ],
            ],
            ['title' => 'Referees', 'rows' => $refereeRows],
            [
                'title' => 'Declaration',
                'rows' => [['Declaration Accepted', $f('declaration') !== '' ? 'Yes' : '']],
            ],
        ],
        'This application was submitted via the UPEC Digital Campus Postgraduate Application form.'
        . ($attachments !== [] ? " The applicant's passport photograph is attached." : '')
    );

    $saved = upec_save_submission('postgraduate-application', $reference, $data);
    $emailResult = upec_send_mail($mail['subject'], $mail['html'], $mail['text'], $email, $attachments);

    if (!$saved && !$emailResult['sent']) {
        error_log('UPEC postgraduate application failed. Email error: ' . $emailResult['error']);
        upec_respond(
            ['success' => false, 'error' => 'We could not submit your application right now. Please try again shortly.'],
            500
        );
    }

    upec_respond([
        'success' => true,
        'reference' => $reference,
        'message' => 'Your postgraduate application has been submitted successfully. The UPEC admissions team will contact you.',
    ]);
} catch (Throwable $e) {
    error_log('UPEC postgraduate application error: ' . $e->getMessage());
    upec_respond(['success' => false, 'error' => 'Something went wrong. Please try again.'], 500);
}
