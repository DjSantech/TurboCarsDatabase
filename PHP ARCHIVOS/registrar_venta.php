<?php
include 'db_connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"), true);

$id_cliente = $data['id_cliente'];
$fecha = $data['fecha'];
$total_venta = $data['total_venta'];
$carros = $data['carros'];  

try {
    $conn->beginTransaction();

    $sqlVenta = "INSERT INTO registroventa (id_cliente, fecha, total_venta) VALUES (:id_cliente, :fecha, :total_venta)";
    $stmtVenta = $conn->prepare($sqlVenta);
    $stmtVenta->bindParam(':id_cliente', $id_cliente);
    $stmtVenta->bindParam(':fecha', $fecha);
    $stmtVenta->bindParam(':total_venta', $total_venta);
    $stmtVenta->execute();

    $sqlUpdateCarro = "UPDATE ingreso_carro SET estado = 'agotado' WHERE ID_carro = :ID_carro";
    $stmtUpdateCarro = $conn->prepare($sqlUpdateCarro);

    foreach ($carros as $ID_carro) {
        $stmtUpdateCarro->bindParam(':ID_carro', $ID_carro, PDO::PARAM_INT);
        $stmtUpdateCarro->execute();
    }

    $conn->commit();

    echo json_encode(["status" => "success", "message" => "Venta registrada y estado de carros actualizado correctamente."]);
} catch (PDOException $e) {
    $conn->rollBack();  
    echo json_encode(["status" => "error", "message" => "Error al registrar la venta o actualizar carros: " . $e->getMessage()]);
}
?>
