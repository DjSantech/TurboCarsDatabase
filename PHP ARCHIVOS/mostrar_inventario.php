<?php
// mostrar_inventario.php
include 'db_connection.php';

try {
    $sql = "SELECT * FROM inventario";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($resultados);
} catch (PDOException $e) {
    echo json_encode(["message" => "Error en la consulta: " . $e->getMessage()]);
}
?>
