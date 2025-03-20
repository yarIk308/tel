<?php
session_start();
include('php/db.php');

// Проверим, есть ли пользователь в сессии
if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];

    // Запрос к базе данных для получения данных о пользователе
    $sql = "SELECT email, name, surname, age, gender FROM users WHERE id = ?";
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $stmt->bind_result($email, $name, $surname, $age, $gender);

        if ($stmt->fetch()) {
            // Если данные найдены, возвращаем их в формате JSON
            echo json_encode([
                "email" => $email,
                "name" => $name,
                "surname" => $surname,
                "age" => $age,
                "gender" => $gender
            ]);
        } else {
            // Если данные не найдены для данного пользователя
            echo json_encode(["error" => "Пользователь не найден"]);
        }

        $stmt->close();
    } else {
        // Ошибка при подготовке запроса
        echo json_encode(["error" => "Ошибка запроса в базу данных"]);
    }
} else {
    // Если пользователь не авторизован
    echo json_encode(["error" => "Пользователь не авторизован"]);
}

$conn->close();
?>
