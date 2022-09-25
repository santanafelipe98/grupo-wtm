<?php
    function isEmpty($data) {
        return empty($data);
    }

    function isEmail($str) {
        $email_pattern = "/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/";
        
        return preg_match($email_pattern, $str);
    }

    function isPhone($str) {
        $phone_number = "/\(?[0-9]{2}\)?\s?([0-9]?\s?)?[0-9]{4}-?[0-9]{4}/";

        return preg_match($phone_number, $str);
    }

    function isCpfOrCnpj($str) {
        $cpf_cnpj = "/([0-9]{3}(\.[0-9]{3}){2}\-[0-9]{2})|([0-9]{2}(\.[0-9]{3}){2}\/[0-9]{4}\-[0-9]{2})/";

        return preg_match($cpf_cnpj, $str);
    }

    function isIn($value, $allowedValues) {
        return in_array($value, $allowedValues);
    }
?>