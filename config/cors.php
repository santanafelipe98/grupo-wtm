<?php

function cors() {
    $allowedOrigins = [ "https://www.grupowtm.com.br" ];
    
    header("Access-Control-Allow-Origin: " . implode(",", $allowedOrigins));
    header("Accept: application/json");
    
    if(isset($_SERVER['HTTP_ORIGIN'])){
        $origin = $_SERVER['HTTP_ORIGIN'];
        
        if (!in_array($origin, $allowedOrigins)) {
            http_response_code(500);
            echo "Not allowed by CORS";
            
            die();
        }
    } else {
        http_response_code(500);
        echo "Not allowed by CORS";
        
        die();
    }
    
    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: POST, PATCH, OPTIONS");
        
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: Origin, X-Requested-With, Accept, Content-Type");
    
        exit(0);
    }
}