<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$to = 'maloblockimarcin2@gmail.com'; // UŻYJ PRAWDZIWEGO ADRESU!
$subject = 'Test PHP mail';
$message = 'To jest testowa wiadomość. Jeśli to widzisz, PHP działa.';
$headers = 'From: maloblockimarcin2@gmail.com' . "\r\n" .
           'Reply-To: maloblockimarcin2@gmail.com' . "\r\n" .
           'Content-Type: text/plain; charset=UTF-8';

if(mail($to, $subject, $message, $headers)) {
    echo 'E-mail WYSLANY - sprawdź skrzynkę (oraz SPAM)';
} else {
    echo 'BLAD: Funkcja mail() zwróciła false';
}

// Dodatkowe logowanie
file_put_contents('mail_log.txt', date('Y-m-d H:i:s')." - Próba wysłania do: $to\n", FILE_APPEND);
?>