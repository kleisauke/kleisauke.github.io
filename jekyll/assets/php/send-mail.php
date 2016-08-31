<?php
error_reporting(0);
header('Access-Control-Allow-Origin: *');
$emailTo = 'postmaster@kleisauke.nl';
$successMessage = [
    'nl' => "Je bericht is succesvol verzonden.",
    'frl' => "Dyn berjocht is suksesfol ferstjoerd.",
    'en' => "Your message has been successfully sent."
];

$siteName = 'KleisAuke.nl';

$subject = [
    'nl' => 'Contactformulier bericht van ' . $siteName,
    'frl' => 'Kontakt formulier berjocht fan ' . $siteName,
    'en' => 'Contact form message from ' . $siteName
];

$messageMinLength = 5;

$errorsArr = [
    'nl' => [
        'noInput' => 'Gelieve alle velden in te vullen!',
        'noName' => 'U heeft geen naam ingevoerd.',
        'noEmail' => 'U heeft geen e-mailadres ingevoerd.',
        'noMessage' => 'U heeft geen bericht ingevoerd.',
        'invalidEmail' => 'Het e-mailadres dat u hebt opgegeven lijkt niet een geldig adres te zijn.',
        'invalidMessage' => 'Het bericht die u hebt ingevoerd is te kort. Het moet minimaal ' . $messageMinLength . ' tekens lang zijn.',
        'invalidEmailAndMessage' => 'Het e-mailadres en het bericht die u hebt ingevoerd zijn niet geldig.',
        'problemSendingEmail' => 'Er is een probleem opgetreden tijdens het versturen van de e-mail. Probeer het later nog eens.'
    ],
    'frl' => [
        'noInput' => 'Wolsto asjeblyft alle fjilden ynfolje?',
        'noName' => 'Jo hat gjin namme ynfierd.',
        'noEmail' => 'Jo hat gjin e-mailadres ynfierd.',
        'noMessage' => 'Jo hat gjin berjocht ynfierd',
        'invalidEmail' => 'It e-mailadres datsto hast opjûn liket net in jildich adres te wêzen.',
        'invalidMessage' => 'It berjocht datsto hast ynfierd is te koart. It moat op syn minst ' . $messageMinLength . ' tekens lang syn.',
        'invalidEmailAndMessage' => 'It e-mailadres en it berjocht datsto hast ynfierd syn net jildich.',
        'problemSendingEmail' => 'Der is in probleem optreden ûnder it ferstjoeren fan de e-mail. Besykje de webside letter nochris.'
    ],
    'en' => [
        'noInput' => 'Please fill in all forms!',
        'noName' => 'Please enter a name',
        'noEmail' => 'Please enter a email address',
        'noMessage' => 'Please leave a message',
        'invalidEmail' => 'The email address you entered does not appear to be a valid address.',
        'invalidMessage' => 'The message you entered is too short. It must be at least ' . $messageMinLength . ' characters.',
        'invalidEmailAndMessage' => 'The email address and message you entered does not appear to be valid.',
        'problemSendingEmail' => 'There was a problem sending the e-mail. Please try again later.'
    ]
];

if (isset($_POST['lang']) && !empty($_POST['lang']) && isset($successMessage[$_POST['lang']])) {
    $language = $_POST['lang'];
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $message = trim($_POST['message']);

    $errorMessage = '';

    $hasNameInput = !empty($name);
    $hasEmailInput = !empty($email);
    $hasTextInput = !empty($message);

    if (!$hasNameInput || !$hasEmailInput || !$hasTextInput) {
        if (!$hasNameInput && !$hasEmailInput && !$hasTextInput) {
            $errorMessage = $errorsArr[$language]['noInput'];
        } else {
            if (!$hasNameInput) {
                $errorMessage = $errorsArr[$language]['noName'];
            } else {
                if (!$hasEmailInput) {
                    $errorMessage = $errorsArr[$language]['noEmail'];
                } else {
                    if (!$hasTextInput) {
                        $errorMessage = $errorsArr[$language]['noMessage'];
                    }
                }
            }
        }
    }

    // Has leave message and e-mail address and name
    if (empty($errorMessage)) {
        $isValidText = strlen($message) > $messageMinLength;
        $isValidEmail = filter_var($email, FILTER_VALIDATE_EMAIL);
        if (!$isValidEmail && !$isValidText) {
            $errorMessage = $errorsArr[$language]['invalidEmailAndMessage'];
        } else {
            if (!$isValidEmail) {
                $errorMessage = $errorsArr[$language]['invalidEmail'];
            } else {
                if (!$isValidText) {
                    $errorMessage = $errorsArr[$language]['invalidMessage'];
                }
            }
        }
    }

    function clean_string($string)
    {
        $bad = array("content-type", "bcc:", "to:", "cc:", "href");
        return str_replace($bad, "", $string);
    }

    $emailFrom = !empty($email) ? $email : $emailTo;

    $emailMessage = PHP_EOL . clean_string($message);

    // create email headers
    $headers = 'From: ' . $name . ' <' . $emailFrom . '> ' . "\r\n" .
        'Reply-To: ' . $emailFrom . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    header('Content-type: application/json');
    if (!empty($errorMessage)) {
        $returnArr = array('status' => 'failed', 'error' => $errorMessage);
        echo json_encode($returnArr);
    } else {
        if (@mail($emailTo, $subject[$language], $emailMessage, $headers)) {
            $returnArr = array('status' => 'success', 'message' => $successMessage[$language]);
            echo json_encode($returnArr);
        } else {
            $returnArr = array('status' => 'failed', 'error' => $errorsArr[$language]['problemSendingEmail']);
            echo json_encode($returnArr);
        }
    }
}
?>
