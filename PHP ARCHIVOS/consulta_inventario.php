<?php
include 'db_connection.php'; // Asegúrate de incluir tu archivo de conexión a la base de datos
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$sql = "SELECT * FROM ingreso_carro";
$stmt = $conn->prepare($sql);

try {
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Devolver los resultados como JSON
    echo json_encode($result);
} catch (PDOException $e) {
    // Manejar errores en la consulta
    echo json_encode(["message" => "Error al obtener los datos: " . $e->getMessage()]);
}
?>
