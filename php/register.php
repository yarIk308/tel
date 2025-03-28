<?php
require 'db.php';

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST["email"]);
    $name = trim($_POST["name"]);
    $surname = trim($_POST["surname"]);
    $age = intval($_POST["age"]);
    $gender = trim($_POST["gender"]);
    $password = $_POST["password"];
    $confirm_password = $_POST["confirm_password"];

    if (empty($email) || empty($name) || empty($password) || empty($confirm_password)) {
        echo json_encode(["success" => false, "message" => "Заполните все поля"]);
        exit();
    }

    if ($password !== $confirm_password) {
        echo json_encode(["success" => false, "message" => "Пароли не совпадают"]);
        exit();
    }

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO users (email, name, surname, age, gender, password) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssiss", $email, $name, $surname, $age, $gender, $hashed_password);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Регистрация успешна"]);
    } else {
        echo json_encode(["success" => false, "message" => "Ошибка при регистрации"]);
    }
}
?>
