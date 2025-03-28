<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
require 'db.php';

header("Content-Type: application/json");

// Проверяем, авторизован ли пользователь
if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "message" => "Пользователь не авторизован"]);
    exit();
}

$user_id = $_SESSION["user_id"];

// Получаем данные пользователя
$stmt = $conn->prepare("SELECT email, name, surname, age, gender FROM users WHERE id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode([
        "success" => true,
        "email" => $user["email"],
        "name" => $user["name"],
        "surname" => $user["surname"],
        "age" => $user["age"],
        "gender" => $user["gender"]
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Пользователь не найден"]);
}
?>
