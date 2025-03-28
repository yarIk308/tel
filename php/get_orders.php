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

// Запрашиваем заказы с правильным полем даты
$query = "SELECT id, created_at AS date, status, total FROM orders WHERE user_id = ?";
$stmt = $conn->prepare($query);

if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Ошибка SQL: " . $conn->error]);
    exit;
}

$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$orders = [];
while ($row = $result->fetch_assoc()) {
    $order_id = $row["id"];
    
    // Запрашиваем товары для заказа
    $items_query = "SELECT oi.product_id, oi.quantity, oi.price, p.name 
                    FROM order_items oi 
                    JOIN products p ON oi.product_id = p.id 
                    WHERE oi.order_id = ?";
    
    $stmt_items = $conn->prepare($items_query);
    if (!$stmt_items) {
        echo json_encode(["success" => false, "message" => "Ошибка SQL (товары): " . $conn->error]);
        exit;
    }

    $stmt_items->bind_param("i", $order_id);
    $stmt_items->execute();
    $items_result = $stmt_items->get_result();
    
    $items = [];
    while ($item = $items_result->fetch_assoc()) {
        $items[] = $item;
    }

    // Добавляем товары в заказ
    $row["items"] = $items;
    $orders[] = $row;
}

if (empty($orders)) {
    echo json_encode(["success" => false, "message" => "Нет заказов"]);
    exit;
}

echo json_encode(["success" => true, "orders" => $orders]);
?>
