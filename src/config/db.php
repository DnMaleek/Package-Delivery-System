<?php

$servername = "localhost"; // Usually 'localhost'
$username = "root";        // Your DB username
$password = "7890";            // Your DB password
$dbname = "package_delivery_system";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode([
        "message" => "Database connection failed"
    ]);
    exit;
}

?>