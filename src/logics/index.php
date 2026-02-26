<?php
header('Content-Type: application/json');
include "../config/db.php";

if($_SERVER['REQUEST_METHOD']==='POST'){

    $data = json_decode(file_get_contents("php://input"), true);

      if (!$data) {
        echo json_encode(["status" => "error", "message" => "Invalid input"]);
        exit;
    }

    $userId = $data['userId'] ?? '';
    $password = $data['password'] ?? '';

    if (empty($userId) || empty($password)) {
        echo json_encode(["status" => "error", "message" => "All fields are required"]);
        exit;
    }

    $sql="SELECT * FROM user WHERE userId=? AND password=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss',$userId,$password);
    $stmt->execute();

    $result = $stmt->get_result();

    if($result->num_rows === 1){
    echo json_encode(["message"=>"Logged in sucesfully"]);
    } else {
        echo json_encode(['message'=>'Invalid credential']);
    }





}

?>