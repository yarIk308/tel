<?php
require 'db.php';

header("Content-Type: application/json");

// Запрос всех товаров
$sql = "SELECT id, name, price, description, image_url FROM products";
$result = $conn->query($sql);

$products = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
    echo json_encode(["success" => true, "products" => $products]);
} else {
    echo json_encode(["success" => false, "message" => "Нет товаров"]);
}
?>
