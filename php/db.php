<?php
$host = "localhost"; 
$user = "root";      
$pass = "";          
$dbname = "phone_store"; 

$conn = new mysqli($host, $user, $pass, $dbname);


if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}
?>
