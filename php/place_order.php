<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require 'db.php';

header("Content-Type: application/json");

// Получаем JSON из запроса
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["user_id"]) || !isset($data["cart"])) {
    echo json_encode(["success" => false, "message" => "Некорректные данные"]);
    exit;
}

$user_id = intval($data["user_id"]);
$cart = $data["cart"];

// Создаём новый заказ
$query = "INSERT INTO orders (user_id, status, total) VALUES (?, 'В обработке', 0)";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$order_id = $stmt->insert_id;

if (!$order_id) {
    echo json_encode(["success" => false, "message" => "Ошибка создания заказа"]);
    exit;
}

// Добавляем товары в order_items
$total_price = 0;
foreach ($cart as $item) {
    $product_id = intval($item["id"]);
    $quantity = intval($item["quantity"]);
    $price = floatval($item["price"]);
    $total_price += $quantity * $price;

    $stmt = $conn->prepare("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("iiid", $order_id, $product_id, $quantity, $price);
    $stmt->execute();
}

// Обновляем общую сумму заказа
$update_query = "UPDATE orders SET total = ? WHERE id = ?";
$stmt = $conn->prepare($update_query);
$stmt->bind_param("di", $total_price, $order_id);
$stmt->execute();

echo json_encode(["success" => true, "order_id" => $order_id]);
?>
