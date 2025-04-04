<?php
session_start();
require 'db.php';
if (!isset($_SESSION["user_id"])) {
    die("Ошибка: Авторизуйтесь!");
}

$user_id = $_SESSION["user_id"];
$product_id = intval($_POST["product_id"]);

$stmt = $conn->prepare("INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, 1)");
$stmt->bind_param("ii", $user_id, $product_id);

if ($stmt->execute()) {
    echo "Товар добавлен в корзину!";
} else {
    echo "Ошибка!";
}
?>
