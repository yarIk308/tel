<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require 'db.php';

header("Content-Type: application/json");

// Получаем JSON из запроса
$data = json_decode(file_get_contents("php://input"), true);

// 📌 Отладка: Выводим полученные данные
file_put_contents("debug_update_user.txt", print_r($data, true));

if (!isset($data["user_id"]) || !isset($data["name"]) || !isset($data["surname"]) || !isset($data["age"]) || !isset($data["gender"])) {
    echo json_encode(["success" => false, "message" => "Некорректные данные"]);
    exit;
}

if (!isset($data["user_id"]) || !isset($data["name"]) || !isset($data["surname"]) || !isset($data["age"]) || !isset($data["gender"])) {
    echo json_encode(["success" => false, "message" => "Некорректные данные"]);
    exit;
}

$user_id = intval($data["user_id"]);
$name = $data["name"];
$surname = $data["surname"];
$age = intval($data["age"]);
$gender = $data["gender"];

// Проверяем соединение с БД
if (!$conn) {
    echo json_encode(["success" => false, "message" => "Ошибка подключения к БД"]);
    exit;
}

// Обновляем данные пользователя
$query = "UPDATE users SET name = ?, surname = ?, age = ?, gender = ? WHERE id = ?";
$stmt = $conn->prepare($query);

if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Ошибка SQL: " . $conn->error]);
    exit;
}

$stmt->bind_param("ssisi", $name, $surname, $age, $gender, $user_id);
if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Ошибка обновления данных"]);
}
?>
