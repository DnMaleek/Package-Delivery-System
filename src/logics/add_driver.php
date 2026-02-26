<?php
    include "../config/db.php";

    header("Content-Type: application/json");

    $formdata = file_get_contents("php://input");
    $data = json_decode($formdata, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode([
            "message" => "Invalid JSON format"
        ]);
        exit;
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        $name = $data['fullname'] ?? '';
        $phone = $data['phone'] ?? '';
        $company = $data['company'] ?? '';
        $route = $data['route'] ?? '';


         if (!$name || !$phone || !$company || !$route) {

            echo json_encode(["message" => "All fields are required"]);
            exit;
        }

    $stmt = $conn->prepare('INSERT INTO drivers (fullname, phone ,company ,route) VALUES (?, ?, ?, ? )');

    if (!$stmt) {
        http_response_code(500);
        echo json_encode(["message" => "Failed to prepare statement: " . $conn->error]);
        exit;
    }

        // Bind parameters (s = string, i = integer)
    $stmt->bind_param("ssss", $name, $phone, $company, $route);
    

    // Execute the query
    if ($stmt->execute()) {
        echo json_encode(["message" => "User added successfully", "id" => $stmt->insert_id]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Failed to add user: " . $stmt->error]);
    }

     // Close statement
    $stmt->close();


    } else {

    http_response_code(405);
    echo json_encode(["message" => "Method not allowed"]);
}

// Close connection
$conn->close();

   

?>