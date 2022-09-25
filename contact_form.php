<?php
    require_once('./validator.php');
    require_once('./config/cors.php');

    define('MESSAGE_MAX_LENGTH', 255);

    cors();

    $plans = [
        "A" => "Básico",
        "B" => "Intermediário",
        "C" => "Profissional",
        "D" => "Personalizado",
    ];

    if (isset(
            $_POST['name'],
            $_POST['email'],
            $_POST['phone'],
            $_POST['cpf_cnpj']
        )) {

        $name          = strip_tags(trim($_POST['name']));
        $contact_email = strip_tags(trim($_POST['email']));
        $phone         = strip_tags(trim($_POST['phone']));
        $cpf_cnpj      = strip_tags(trim($_POST['cpf_cnpj']))

        // Validações

        $errors = [];

        if (isEmpty($name)) {
            $errors[] = "O campo <strong>nome</strong> é obrigatório.";
        }

        if (!isEmail($contact_email)) {
            $errors[] = "E-mail inválido.";
        }

        if (!isPhone($phone)) {
            $errors[] = "Número de telefone inválido.";
        }

        if (!isCpfOrCnpj($cpf_cnpj)) {
            $errors[] = "CPF ou CNPJ inválido.";
        }

        $plan_keys = array_keys($plans);
        $subject      = "";

        if (isset($_POST['plan'])) {
            $plan = strip_tags(trim($_POST['plan']));

            if (!isIn($plan, $plan_keys)) {
                $errors[] = "Plano inválido.";
            }

            $subject = "Solicitação de adesão - " . $plans[$plan];
        } else {
            $subject = "Contato - " . $name;
        }

        if (count($errors) > 0) {
            http_response_code(400);
            echo json_encode([ 'errors' => $errors ]);
            die();
        }


        $recipient_email = "vendas@starproambiental.com.br";
        $html            = $message . "<br/><br />" . "Att.,<br/>" . $name . "<br/>" . $phone;
        $headers[] = "MIME-Version: 1.0";
        $headers[] = 'Content-type: text/html; charset=utf-8';
        $headers[] = "To: " . $recipient_email;
        $headers[] = "From: " . $contact_email;
        $headers[] = "Return-path: " . $contact_email;
        $header = implode("\r\n", $headers);

        $result = mail($recipient_email, $subject, $html, $header);

        http_response_code(200);

        echo json_encode($html);

        if ($result) {
            http_response_code(200);
        } else {
            http_response_code(400);
            echo json_encode([ 'errors' => [ 'Não foi possível enviar a mensagem. Tente novamente.' ] ]);
        }

        die();
    }

    http_response_code(400);
    echo json_encode([ 'errors' => [ 'Os campos <strong>nome</strong>, <strong>e-mail</strong> e <strong>telefone</strong> são obrigatórios.' ] ]);
?>