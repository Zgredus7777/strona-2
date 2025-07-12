<?php
header('Content-Type: application/json');

// Konfiguracja
$secretKey = "6LfN1IArAAAAAJm_EC6EeP4vhJOwwnCFfVK3Eqev"; // Twój tajny klucz reCAPTCHA
$to = 'twoj@email.com'; // Tutaj wpisz swój prawdziwy adres email
$from = 'kontakt@darkpromptstudio.pl'; // Adres email nadawcy

// Pobierz dane z żądania
$data = json_decode(file_get_contents('php://input'), true);
$email = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
$message = strip_tags($data['message'] ?? '');
$recaptcha = $data['recaptcha'] ?? '';

// Walidacja danych
if (empty($email) {
    echo json_encode(['success' => false, 'error' => 'Email jest wymagany']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'error' => 'Nieprawidłowy format email']);
    exit;
}

if (empty($message)) {
    echo json_encode(['success' => false, 'error' => 'Wiadomość nie może być pusta']);
    exit;
}

// Weryfikacja reCAPTCHA
$verifyUrl = "https://www.google.com/recaptcha/api/siteverify?secret=$secretKey&response=$recaptcha";
$response = file_get_contents($verifyUrl);
$result = json_decode($response);

if (!$result->success) {
    $error = 'Weryfikacja reCAPTCHA nie powiodła się';
    if (!empty($result->{'error-codes'})) {
        $errors = implode(', ', $result->{'error-codes'});
        $error .= " (Błędy: $errors)";
    }
    echo json_encode(['success' => false, 'error' => $error]);
    exit;
}

// Przygotowanie wiadomości email
$subject = "Nowa wiadomość od $email";
$emailContent = "Od: $email\n\n";
$emailContent .= "Wiadomość:\n$message\n\n";
$emailContent .= "---\nWiadomość wysłana ze strony DarkPrompt Studio";

$headers = [
    'From' => $from,
    'Reply-To' => $email,
    'X-Mailer' => 'PHP/' . phpversion(),
    'Content-Type' => 'text/plain; charset=utf-8'
];

// Formatowanie nagłówków
$formattedHeaders = '';
foreach ($headers as $key => $value) {
    $formattedHeaders .= "$key: $value\r\n";
}

// Wysłanie emaila
if (mail($to, $subject, $emailContent, $formattedHeaders)) {
    echo json_encode(['success' => true]);
} else {
    // Dodatkowe logowanie błędów
    error_log("Błąd wysyłania maila: " . error_get_last()['message']);
    echo json_encode(['success' => false, 'error' => 'Błąd serwera podczas wysyłania wiadomości']);
}
?>