<?php
require __DIR__ . '/../vendor/autoload.php';

error_reporting(0);
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

$secret = '##REDACTED##';

$emailTo = 'postmaster@kleisauke.nl';
$successMessage = [
    'nl' => 'Je bericht is succesvol verzonden.',
    'en' => 'Your message has been successfully sent.'
];

$siteName = 'KleisAuke.nl';

$subject = [
    'nl' => 'Contactformulier bericht van ' . $siteName,
    'en' => 'Contact form message from ' . $siteName
];

$messageMinLength = 5;

$labels = [
    'nl' => [
        'name' => 'naam',
        'email' => 'e-mailadres',
        'message' => 'bericht'
    ],
    'en' => [
        'name' => 'name',
        'email' => 'email address',
        'message' => 'message'
    ]
];

$errorsArr = [
    'nl' => [
        'recaptcha' => 'De reCAPTCHA was niet goed ingevuld.',
        'required' => 'U heeft geen {field} ingevoerd.',
        'email' => 'Het e-mailadres dat u hebt opgegeven lijkt niet een geldig adres te zijn.',
        'message' => 'Het bericht die u hebt ingevoerd is te kort. Het moet minimaal ' . $messageMinLength . ' tekens lang zijn.',
        'send' => 'Er is een probleem opgetreden tijdens het versturen van de e-mail. Probeer het later nog eens.',
        'validation' => 'Niet alle velden zijn (juist) ingevuld.'
    ],
    'en' => [
        'recaptcha' => 'The reCAPTCHA wasn\'t entered correctly.',
        'required' => 'Please enter a {field}.',
        'email' => 'The email address you entered does not appear to be a valid address.',
        'message' => 'The message you entered is too short. It must be at least ' . $messageMinLength . ' characters.',
        'send' => 'There was a problem sending the e-mail. Please try again later.',
        'validation' => 'Not all fields have been filled in correctly.'
    ]
];

function clean_string($string)
{
    $bad = ['content-type', 'bcc:', 'to:', 'cc:', 'href'];
    return str_replace($bad, '', $string);
}

if (!empty($_POST['lang']) && isset($successMessage[$_POST['lang']])) {
    $language = $_POST['lang'];

    $recaptcha = new \ReCaptcha\ReCaptcha($secret);

    $v = new Valitron\Validator($_POST);
    $v->rule(function ($field, $value, array $params, array $fields) use ($recaptcha) {
        $resp = $recaptcha->verify($value, $_SERVER['REMOTE_ADDR']);
        return $resp->isSuccess();
    }, 'g-recaptcha-response')->message($errorsArr[$language]['recaptcha']);
    $v->rule('required', ['name', 'email', 'message'])->message($errorsArr[$language]['required']);
    $v->rule('email', 'email')->message($errorsArr[$language]['email']);
    $v->rule('lengthMin', 'message', $messageMinLength)->message($errorsArr[$language]['message']);
    $v->labels($labels[$language]);

    if ($v->validate()) {
        $name = trim($_POST['name']);
        $email = trim($_POST['email']);
        $message = trim($_POST['message']);

        $emailMessage = PHP_EOL . clean_string($message);

        // Create email headers
        $headers = 'From: ' . clean_string($name) . ' <contactform@gra.kleisauke.nl> ' . "\r\n" .
            'Reply-To: ' . clean_string($email) . "\r\n" .
            'X-Mailer: PHP/' . PHP_VERSION;

        if (@mail($emailTo, $subject[$language], $emailMessage, $headers)) {
            echo json_encode([
                'status' => 'success',
                'data' => null,
                'message' => $successMessage[$language]
            ]);
        } else {
            http_response_code(400);
            echo json_encode([
                'status' => 'error',
                'data' => null,
                'message' => $errorsArr[$language]['send']
            ]);
        }
    } else {
        http_response_code(400);
        $errors = [];
        array_walk_recursive($v->errors(), function ($v) use (&$errors) {
            $errors[] = $v;
        });

        echo json_encode([
            'status' => 'error',
            'data' => $errors,
            'message' => $errorsArr[$language]['validation']
        ]);
    }
}
