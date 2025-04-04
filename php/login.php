<?php
session_start();
require 'db.php';

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST["email"]);
    $password = $_POST["password"];

    if (empty($email) || empty($password)) {
        echo json_encode(["success" => false, "message" => "Введите email и пароль"]);
        exit();
    }

    $stmt = $conn->prepare("SELECT id, name, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $name, $hashed_password);
        $stmt->fetch();

        if (password_verify($password, $hashed_password)) {
            $_SESSION["user_id"] = $id;
            $_SESSION["user_name"] = $name;

            echo json_encode([
                "success" => true,
                "user_id" => $id, // Теперь передаём user_id!
                "username" => $name
            ]);
            exit();
        } else {
            echo json_encode(["success" => false, "message" => "Неверный пароль"]);
            exit();
        }
    } else {
        echo json_encode(["success" => false, "message" => "Пользователь не найден"]);
        exit();
    }
}
?>
