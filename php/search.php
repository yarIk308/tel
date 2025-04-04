<?php
require 'db.php';
header("Content-Type: application/json");

if (!isset($_GET["query"])) {
    echo json_encode(["success" => false, "message" => "Запрос не указан"]);
    exit;
}

$query = $conn->real_escape_string($_GET["query"]);
$sql = "SELECT id, name, price FROM products WHERE name LIKE '%$query%' LIMIT 5";
$result = $conn->query($sql);

$products = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
    echo json_encode(["success" => true, "products" => $products]);
} else {
    echo json_encode(["success" => false, "message" => "Ничего не найдено"]);
}
?>
