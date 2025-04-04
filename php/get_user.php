<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require 'db.php';

header("Content-Type: application/json");

if (!isset($_GET["user_id"])) {
    echo json_encode(["success" => false, "message" => "Не указан ID пользователя"]);
    exit;
}

$user_id = intval($_GET["user_id"]);

// Проверяем соединение с БД
if (!$conn) {
    echo json_encode(["success" => false, "message" => "Ошибка подключения к БД"]);
    exit;
}

// Проверяем, существует ли пользователь
$query = "SELECT email, name, surname, birthdate, gender FROM users WHERE id = ?";
$stmt = $conn->prepare($query);

if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Ошибка SQL: " . $conn->error]);
    exit;
}

$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user) {
    echo json_encode(["success" => true, "user" => $user]);
} else {
    echo json_encode(["success" => false, "message" => "Пользователь не найден"]);
}
?>
