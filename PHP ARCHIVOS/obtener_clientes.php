<?php
// obtener_clientes.php
include 'db_connection.php'; // Asegúrate de que este archivo esté configurado correctamente

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

try {
    // Preparar la consulta SQL
    $sql = "SELECT ID_cliente, nombre, apellido FROM registroclientes";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    // Obtener los resultados
    $clientes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Devolver los resultados como JSON
    echo json_encode($clientes);
} catch (PDOException $e) {
    echo json_encode(["message" => "Error al obtener clientes: " . $e->getMessage()]);
}
?>
