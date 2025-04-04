<?php
require 'db.php'; // Подключение к БД

header('Content-Type: application/json');

// Получаем JSON-данные
$data = json_decode(file_get_contents("php://input"), true);

// Проверяем, что пришли все данные
if (isset($data['user_id'], $data['name'], $data['surname'], $data['birthdate'], $data['gender'])) {
    $user_id = intval($data['user_id']);
    $name = trim($data['name']);
    $surname = trim($data['surname']);
    $birthdate = $data['birthdate'];
    $gender = $data['gender'];

    // Проверка пустых полей
    if (empty($name) || empty($surname) || empty($birthdate) || empty($gender)) {
        echo json_encode(["success" => false, "message" => "Заполните все поля"]);
        exit;
    }

    // Обновление данных пользователя
    $stmt = $conn->prepare("UPDATE users SET name=?, surname=?, birthdate=?, gender=? WHERE id=?");
    if (!$stmt) {
        echo json_encode(["success" => false, "message" => "Ошибка подготовки SQL: " . $conn->error]);
        exit;
    }

    $stmt->bind_param("ssssi", $name, $surname, $birthdate, $gender, $user_id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Ошибка обновления данных: " . $stmt->error]);
    }

} else {
    echo json_encode(["success" => false, "message" => "Некорректные данные"]);
}
?>
