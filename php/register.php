<?php
require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$email = $data["email"] ?? "";
$name = $data["name"] ?? "";
$surname = $data["surname"] ?? "";
$birthdate = $data["birthdate"] ?? "";
$gender = $data["gender"] ?? "";
$password = $data["password"] ?? "";

// Проверяем, заполнены ли все поля
if (empty($email) || empty($name) || empty($surname) || empty($birthdate) || empty($gender) || empty($password)) {
    echo json_encode(["success" => false, "message" => "Все поля должны быть заполнены"]);
    exit;
}

// Хешируем пароль
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Записываем данные в БД
$stmt = $conn->prepare("INSERT INTO users (email, name, surname, birthdate, gender, password) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $email, $name, $surname, $birthdate, $gender, $hashedPassword);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Ошибка регистрации"]);
}

$stmt->close();
$conn->close();
?>
