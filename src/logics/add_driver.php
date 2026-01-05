<?php

require __DIR__ . '/../config/db.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $full_name    = trim($_POST["fullname"] ?? '');
    $phone_number = trim($_POST["phone"] ?? '');
    $company_name = trim($_POST["company"] ?? '');
    $route        = trim($_POST["route"] ?? '');

    // Validation
    if (!$full_name || !$phone_number || !$company_name || !$route) {
        http_response_code(400);
        echo "All fields are required.";
        exit;
    }

    try {
        $stmt = $pdo->prepare("
            INSERT INTO drivers 
                (full_name, phone_number, company_name, route, create_time)
            VALUES 
                (:full_name, :phone_number, :company_name, :route, NOW())
        ");

        $stmt->execute([
            'full_name'    => $full_name,
            'phone_number' => $phone_number,
            'company_name' => $company_name,
            'route'        => $route
        ]);

        echo "Driver added successfully.";

    } catch (PDOException $e) {
        error_log($e->getMessage());
        http_response_code(500);
        echo "Failed to add driver.";
    }
}
