<?php
session_start();
require 'db.php';  

if (!isset($_SESSION["user_id"])) {
    header("Location: auth.html");
    exit();
}

$user_id = $_SESSION["user_id"];
$stmt = $conn->prepare("SELECT id, status, total_price FROM orders WHERE user_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->bind_result($order_id, $status, $total_price);

echo "<h2>Ваши заказы</h2>";

while ($stmt->fetch()) {
    echo "<p>Заказ #$order_id | Статус: $status | Сумма: $total_price$</p>";
}
?>
