<?php
header('Content-Type: text/plain');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'error';
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$email = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
$message = filter_var($data['message'] ?? '', FILTER_SANITIZE_STRING);

if (!$email || !$message) {
    http_response_code(400);
    echo 'error';
    exit;
}

// Konfiguracja
$to = 'maloblockimarcin2@gmail.com';  // Tutaj wpisz swój email
$subject = 'Wiadomość z czatu DarkPrompt Studio';
$headers = "From: maloblockimarcin2@gmail.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Treść wiadomości
$body = "Nowa wiadomość z czatu:\n\n";
$body .= "Email: $email\n";
$body .= "Wiadomość:\n$message\n\n";
$body .= "---\nWiadomość wygenerowana automatycznie";

// Wysłanie emaila
if (mail($to, $subject, $body, $headers)) {
    echo 'success';
} else {
    http_response_code(500);
    echo 'error';
}
?>