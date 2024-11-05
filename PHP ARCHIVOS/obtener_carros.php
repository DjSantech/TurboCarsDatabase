<?php
// obtener_carros.php
include 'db_connection.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

try {
    $sql = "SELECT * FROM ingreso_carro WHERE estado = 'disponible'";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $carros = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($carros);
} catch (PDOException $e) {
    echo json_encode(["error" => "Error al obtener carros: " . $e->getMessage()]);
}
?>

