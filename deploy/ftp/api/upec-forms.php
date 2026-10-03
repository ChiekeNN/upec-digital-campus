<?php
declare(strict_types=1);

/**
 * UPEC Digital Campus — shared form backend (pure PHP 8.x, no Composer).
 *
 * Powers the four website forms on an ordinary Apache + PHP host:
 *   /api/enquiry                    -> Contact page
 *   /api/application                -> Apply page (Expression of Interest / Full Application)
 *   /api/application/postgraduate   -> Postgraduate Application (passport photo attached)
 *   /api/application/training       -> Entrepreneur Training Registration (photo attached)
 *
 * Every submission is:
 *   1. emailed to UPEC_NOTIFICATION_EMAIL (plain mail() or optional SMTP), and
 *   2. saved as a backup file in api/_submissions/ (blocked from web access).
 * A submission only fails when BOTH delivery channels fail.
 */

/* =============================== CONFIG ================================ */

/** Recipient for ALL website form notifications. */
const UPEC_NOTIFICATION_EMAIL = 'chiekenn@gmail.com';

/** Sender name shown on the notification email. */
const UPEC_FROM_NAME = 'UPEC Digital Campus';

/**
 * Optional SMTP (recommended for reliable delivery, e.g. Gmail + App Password).
 * Leave UPEC_SMTP_HOST empty to use the server's built-in mail() function.
 *
 * For Gmail: Google Account -> Security -> 2-Step Verification -> App passwords.
 * Use your Gmail address as UPEC_SMTP_USER and the app password as UPEC_SMTP_PASS.
 */
const UPEC_SMTP_HOST = '';           // e.g. 'smtp.gmail.com'
const UPEC_SMTP_PORT = 587;          // 587 = STARTTLS, 465 = SSL
const UPEC_SMTP_USER = '';           // e.g. 'your-email@gmail.com'
const UPEC_SMTP_PASS = '';           // e.g. your Gmail App Password

/** Keep a copy of every submission in api/_submissions/ (strongly recommended). */
const UPEC_SAVE_SUBMISSIONS = true;

/* ======================================================================= */

// Block direct web access to this library file (it only defines functions).
if (basename((string) ($_SERVER['SCRIPT_FILENAME'] ?? '')) === basename(__FILE__)) {
    http_response_code(404);
    exit;
}

/** Trim and cast to string. */
function upec_str(mixed $value): string
{
    if ($value === null || $value === false) {
        return '';
    }
    if (is_array($value)) {
        return implode(', ', array_map('upec_str', $value));
    }
    return trim((string) $value);
}

/** HTML-escape for safe embedding in the notification email. */
function upec_e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function upec_email_valid(string $email): bool
{
    return (bool) preg_match('/^[^\s@]+@[^\s@]+\.[^\s@]+$/', $email);
}

/** Read and decode the JSON request body. */
function upec_json_input(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        return [];
    }
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

/** Send a JSON response and stop. */
function upec_respond(array $body, int $status = 200): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

/** Only POST is allowed on the form endpoints. */
function upec_require_post(): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
        upec_respond(['success' => false, 'error' => 'Method not allowed.'], 405);
    }
}

/** Generate a reference number such as UPEC-PG-123456. */
function upec_reference(string $prefix): string
{
    return $prefix . '-' . substr((string) (int) floor(microtime(true) * 1000), -6);
}

/* ---------------------------- Email building ---------------------------- */

function upec_email_row(string $label, string $value): string
{
    $value = trim($value);
    if ($value === '') {
        return '';
    }
    return "\n    <tr>\n"
        . '      <td style="padding:8px 12px;border-bottom:1px solid #eef2f7;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;width:220px;vertical-align:top;">' . upec_e($label) . "</td>\n"
        . '      <td style="padding:8px 12px;border-bottom:1px solid #eef2f7;font-size:14px;color:#0f172a;vertical-align:top;">' . nl2br(upec_e($value)) . "</td>\n"
        . "    </tr>";
}

function upec_email_section(string $title, array $rows): string
{
    $body = '';
    foreach ($rows as [$label, $value]) {
        $body .= upec_email_row($label, upec_str($value));
    }
    if ($body === '') {
        return '';
    }
    return "\n    <tr>\n"
        . '      <td colspan="2" style="padding:16px 12px 6px;font-size:13px;font-weight:800;color:#003b73;text-transform:uppercase;letter-spacing:.08em;background:#f0f7ff;">' . upec_e($title) . "</td>\n"
        . "    </tr>" . $body;
}

/**
 * Build the branded notification email (same look as the Node mailer).
 *
 * @param array $sections list of ['title' => string, 'rows' => [[label, value], ...]]
 * @return array{subject: string, html: string, text: string}
 */
function upec_build_form_email(
    string $heading,
    string $subject,
    ?string $reference,
    array $sections,
    string $footer
): array {
    $meta = ($reference !== null && $reference !== ''
        ? 'Reference: <strong>' . upec_e($reference) . '</strong> &middot; '
        : '') . 'Submitted ' . upec_e(gmdate('D, d M Y H:i:s') . ' GMT');

    $body = '';
    foreach ($sections as $section) {
        $body .= upec_email_section($section['title'] ?? '', $section['rows'] ?? []);
    }

    $html = '
  <div style="margin:0;padding:24px;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:720px;margin:0 auto;">
      <div style="background:#003b73;border-radius:12px 12px 0 0;padding:20px 24px;">
        <p style="margin:0;font-size:11px;font-weight:700;color:#9dc3e8;text-transform:uppercase;letter-spacing:.12em;">University of Port Harcourt Entrepreneurial Centre</p>
        <h1 style="margin:4px 0 0;font-size:20px;color:#ffffff;">' . upec_e($heading) . '</h1>
        <p style="margin:8px 0 0;font-size:13px;color:#cfe3f5;">' . $meta . '</p>
      </div>
      <div style="background:#ffffff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;padding:8px 16px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          ' . $body . '
        </table>
        <p style="margin:20px 0 0;font-size:12px;color:#94a3b8;">' . upec_e($footer) . '</p>
      </div>
    </div>
  </div>';

    $textParts = [$heading];
    if ($reference !== null && $reference !== '') {
        $textParts[] = 'Reference: ' . $reference;
    }
    foreach ($sections as $section) {
        $lines = [];
        foreach (($section['rows'] ?? []) as [$label, $value]) {
            $v = upec_str($value);
            if ($v !== '') {
                $lines[] = $label . ': ' . $v;
            }
        }
        if ($lines !== []) {
            $textParts[] = "\n== " . ($section['title'] ?? '') . " ==\n" . implode("\n", $lines);
        }
    }

    return ['subject' => $subject, 'html' => $html, 'text' => implode("\n", $textParts)];
}

/* ----------------------------- Attachments ------------------------------ */

/**
 * Decode a base64 data URL (e.g. "data:image/png;base64,...").
 * @return array{contentType: string, content: string}|null
 */
function upec_parse_data_url(?string $dataUrl): ?array
{
    if ($dataUrl === null || !preg_match('#^data:([^;]+);base64,(.+)$#s', $dataUrl, $m)) {
        return null;
    }
    $binary = base64_decode($m[2], true);
    if ($binary === false) {
        return null;
    }
    return ['contentType' => $m[1], 'content' => $binary];
}

/**
 * Build an attachment entry from the form's passport-photo data URL.
 * @return array{filename: string, content: string, contentType: string}|null
 */
function upec_photo_attachment(?string $dataUrl, ?string $photoName, string $reference): ?array
{
    $parsed = upec_parse_data_url($dataUrl);
    if ($parsed === null) {
        return null;
    }
    $ext = str_contains($parsed['contentType'], 'png') ? 'png' : 'jpg';
    $filename = upec_str((string) $photoName);
    if ($filename === '') {
        $filename = 'passport-photo-' . $reference . '.' . $ext;
    }
    $filename = str_replace(["\r", "\n", '"'], '', $filename);
    return [
        'filename' => $filename,
        'content' => $parsed['content'],
        'contentType' => $parsed['contentType'],
    ];
}

/* ------------------------------- Sending -------------------------------- */

/** Address used as the envelope/From sender. */
function upec_sender_address(): string
{
    if (UPEC_SMTP_USER !== '') {
        return UPEC_SMTP_USER;
    }
    $host = strtolower((string) ($_SERVER['HTTP_HOST'] ?? $_SERVER['SERVER_NAME'] ?? ''));
    $host = explode(':', $host)[0]; // strip any :port suffix
    $host = preg_replace('/[^a-z0-9.\-]/', '', $host) ?: 'localhost';
    return 'no-reply@' . $host;
}

/**
 * Assemble a full MIME message.
 * @param array $attachments list of ['filename' =>, 'content' =>, 'contentType' =>]
 * @return array{from: string, to: string, headerBlock: string, mailHeaders: string, body: string}
 */
function upec_mime_message(string $subject, string $html, string $text, ?string $replyTo, array $attachments): array
{
    $from = upec_sender_address();
    $to = UPEC_NOTIFICATION_EMAIL;
    $fromHeader = '=?UTF-8?B?' . base64_encode(UPEC_FROM_NAME) . '?= <' . $from . '>';

    $mixed = 'b1_' . bin2hex(random_bytes(10));
    $alt = 'b2_' . bin2hex(random_bytes(10));

    $headerLines = [
        'Date: ' . date('r'),
        'From: ' . $fromHeader,
        'To: <' . $to . '>',
        'Subject: =?UTF-8?B?' . base64_encode($subject) . '?=',
        'Message-ID: <' . bin2hex(random_bytes(16)) . '@upec-forms>',
        'MIME-Version: 1.0',
        'Content-Type: multipart/mixed; boundary="' . $mixed . '"',
    ];
    if ($replyTo !== null && upec_email_valid($replyTo)) {
        $headerLines[] = 'Reply-To: ' . $replyTo;
    }

    $b64text = chunk_split(base64_encode($text), 76, "\r\n");
    $b64html = chunk_split(base64_encode($html), 76, "\r\n");

    $body = '--' . $mixed . "\r\n"
        . 'Content-Type: multipart/alternative; boundary="' . $alt . '"' . "\r\n\r\n"
        . '--' . $alt . "\r\n"
        . "Content-Type: text/plain; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: base64\r\n\r\n"
        . $b64text . "\r\n"
        . '--' . $alt . "\r\n"
        . "Content-Type: text/html; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: base64\r\n\r\n"
        . $b64html . "\r\n"
        . '--' . $alt . "--\r\n\r\n";

    foreach ($attachments as $att) {
        $safeName = str_replace(["\r", "\n", '"'], '', (string) $att['filename']);
        $body .= '--' . $mixed . "\r\n"
            . 'Content-Type: ' . $att['contentType'] . '; name="' . $safeName . '"' . "\r\n"
            . "Content-Transfer-Encoding: base64\r\n"
            . 'Content-Disposition: attachment; filename="' . $safeName . '"' . "\r\n\r\n"
            . chunk_split(base64_encode((string) $att['content']), 76, "\r\n") . "\r\n";
    }
    $body .= '--' . $mixed . '--';

    // mail() adds its own To:/Subject: from the parameters, so strip those
    // header lines to avoid duplicates.
    $mailHeaders = implode("\r\n", array_values(array_filter(
        $headerLines,
        static fn (string $line): bool => !str_starts_with($line, 'To:') && !str_starts_with($line, 'Subject:')
    )));

    return [
        'from' => $from,
        'to' => $to,
        'subject' => $subject,
        'headerBlock' => implode("\r\n", $headerLines),
        'mailHeaders' => $mailHeaders,
        'body' => $body,
    ];
}

/** Minimal SMTP client (AUTH LOGIN, STARTTLS on 587 / SSL on 465). */
function upec_smtp_send(string $host, int $port, string $user, string $pass, string $from, string $to, string $headerBlock, string $body): array
{
    $remote = ($port === 465 ? 'ssl://' : 'tcp://') . $host . ':' . $port;
    $sock = @stream_socket_client($remote, $errno, $errstr, 20);
    if ($sock === false) {
        return ['sent' => false, 'error' => 'SMTP connection failed: ' . $errstr . ' (' . $errno . ')'];
    }
    stream_set_timeout($sock, 20);

    $read = static function () use ($sock): string {
        $data = '';
        while (($line = fgets($sock, 1024)) !== false) {
            $data .= $line;
            if (!isset($line[3]) || $line[3] === ' ') {
                break;
            }
        }
        return $data;
    };

    $cmd = static function (string $command, array $expected) use ($sock, $read): string {
        fwrite($sock, $command . "\r\n");
        $response = $read();
        $code = (int) substr($response, 0, 3);
        if (!in_array($code, $expected, true)) {
            throw new RuntimeException('SMTP error: ' . trim($response));
        }
        return $response;
    };

    try {
        $read(); // server greeting
        $localHost = (string) ($_SERVER['SERVER_NAME'] ?? 'localhost');
        $cmd('EHLO ' . $localHost, [250]);
        if ($port !== 465) {
            $cmd('STARTTLS', [220]);
            $tls = STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT;
            if (defined('STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT')) {
                $tls |= STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT;
            }
            stream_socket_enable_crypto($sock, true, $tls);
            $cmd('EHLO ' . $localHost, [250]);
        }
        $cmd('AUTH LOGIN', [334]);
        $cmd(base64_encode($user), [334]);
        $cmd(base64_encode($pass), [235]);
        $cmd('MAIL FROM:<' . $from . '>', [250]);
        $cmd('RCPT TO:<' . $to . '>', [250, 251]);
        $cmd('DATA', [354]);
        fwrite($sock, $headerBlock . "\r\n\r\n" . $body . "\r\n.\r\n");
        $response = $read();
        if ((int) substr($response, 0, 3) !== 250) {
            throw new RuntimeException('SMTP message rejected: ' . trim($response));
        }
        @fwrite($sock, "QUIT\r\n");
        fclose($sock);
        return ['sent' => true, 'error' => ''];
    } catch (Throwable $e) {
        @fclose($sock);
        return ['sent' => false, 'error' => $e->getMessage()];
    }
}

/**
 * Send the notification email via SMTP (if configured) or the server's mail().
 * @return array{sent: bool, error: string}
 */
function upec_send_mail(string $subject, string $html, string $text, ?string $replyTo, array $attachments = []): array
{
    $mime = upec_mime_message($subject, $html, $text, $replyTo, $attachments);

    if (UPEC_SMTP_HOST !== '' && UPEC_SMTP_USER !== '' && UPEC_SMTP_PASS !== '') {
        return upec_smtp_send(
            UPEC_SMTP_HOST,
            UPEC_SMTP_PORT,
            UPEC_SMTP_USER,
            UPEC_SMTP_PASS,
            $mime['from'],
            $mime['to'],
            $mime['headerBlock'],
            $mime['body']
        );
    }

    try {
        $extra = '-f' . $mime['from'];
        $ok = @mail($mime['to'], $mime['subject'], $mime['body'], $mime['mailHeaders'], $extra);
        if (!$ok) {
            $last = error_get_last();
            return ['sent' => false, 'error' => 'mail() failed' . (isset($last['message']) ? ': ' . $last['message'] : '')];
        }
        return ['sent' => true, 'error' => ''];
    } catch (Throwable $e) {
        return ['sent' => false, 'error' => $e->getMessage()];
    }
}

/* --------------------------- Submission backup --------------------------- */

/**
 * Save a copy of the submission to api/_submissions/ so nothing is lost even
 * if email delivery fails. Passport photos are saved as separate image files.
 */
function upec_save_submission(string $kind, string $reference, array $data): bool
{
    if (!UPEC_SAVE_SUBMISSIONS) {
        return false;
    }
    try {
        $dir = __DIR__ . '/_submissions';
        if (!is_dir($dir) && !@mkdir($dir, 0775, true)) {
            return false;
        }
        if (!is_file($dir . '/.htaccess')) {
            @file_put_contents($dir . '/.htaccess', "Require all denied\n");
        }

        $photo = $data['photo'] ?? null;
        if (is_string($photo) && $photo !== '') {
            $parsed = upec_parse_data_url($photo);
            if ($parsed !== null) {
                $ext = str_contains($parsed['contentType'], 'png') ? 'png' : 'jpg';
                $photoFile = date('Ymd-His') . '_' . $reference . '_passport.' . $ext;
                if (@file_put_contents($dir . '/' . $photoFile, $parsed['content']) !== false) {
                    $data['photo'] = 'Saved as file: ' . $photoFile;
                } else {
                    unset($data['photo']);
                }
            }
        }

        $data['_meta'] = [
            'form' => $kind,
            'reference' => $reference,
            'submittedAt' => date('c'),
            'ip' => $_SERVER['REMOTE_ADDR'] ?? '',
        ];

        $name = date('Ymd-His') . '_' . $reference . '.json';
        $json = json_encode(
            $data,
            JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
        );
        return $json !== false && @file_put_contents($dir . '/' . $name, $json) !== false;
    } catch (Throwable) {
        return false;
    }
}
