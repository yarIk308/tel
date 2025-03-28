<?php
require 'db.php';
header("Content-Type: application/json");

// Выбираем случайные 3 товара
$query = "SELECT id, name, price, image_url FROM products ORDER BY RAND() LIMIT 3";
$result = $conn->query($query);

$products = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
    echo json_encode(["success" => true, "products" => $products]);
} else {
    echo json_encode(["success" => false]);
}
?>
