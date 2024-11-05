<?php
// db_connection.php

$host = "localhost";  // Dirección del servidor
$db_name = "turbocars"; // Nombre de la base de datos
$username = "root";  // Usuario de la base de datos
$password = "";  // Contraseña de la base de datos

try {
    // Conectar a la base de datos usando PDO
    $conn = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
    // Configurar PDO para lanzar excepciones en caso de error
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Si la conexión es exitosa
} catch (PDOException $e) {

}
?>
