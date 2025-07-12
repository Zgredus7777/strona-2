<?php
    $to = 'maloblockimarcin2@gmail.com'; // Tutaj wpisz prawidłowy adres e-mail odbiorcy
    $subject = 'Testowy email';
    $message = 'To jest testowa wiadomość';
    $headers = 'From: test@example.com' . "\r\n" .
               'Content-Type: text/plain; charset=UTF-8';

    if(mail($to, $subject, $message, $headers)) {
        echo 'E-mail wysłany pomyślnie';
    } else {
        echo 'Błąd podczas wysyłania e-maila';
    }
?>