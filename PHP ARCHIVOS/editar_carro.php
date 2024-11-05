<?php
include 'db_connection.php'; 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Validar los datos de entrada
$ID_carro = $_POST['ID_carro'] ?? null;
$Modelo = $_POST['Modelo'] ?? null;
$Marca = $_POST['Marca'] ?? null;
$Anio = $_POST['Anio'] ?? null;
$color = $_POST['color'] ?? null;
$Escala = $_POST['Escala'] ?? null;
$Precio = $_POST['Precio'] ?? null;

// Preparar la consulta de actualización con PDO
$sql = "UPDATE ingreso_carro SET Modelo=:Modelo, Marca=:Marca, Anio=:Anio, color=:color, Escala=:Escala, Precio=:Precio WHERE ID_carro=:ID_carro";
$stmt = $conn->prepare($sql);

// Vincular los valores
$stmt->bindValue(':ID_carro', $ID_carro, PDO::PARAM_INT);
$stmt->bindValue(':Modelo', $Modelo, PDO::PARAM_STR);
$stmt->bindValue(':Marca', $Marca, PDO::PARAM_STR);
$stmt->bindValue(':Anio', $Anio, PDO::PARAM_INT);
$stmt->bindValue(':color', $color, PDO::PARAM_STR);
$stmt->bindValue(':Escala', $Escala, PDO::PARAM_STR);
$stmt->bindValue(':Precio', $Precio, PDO::PARAM_INT);

// Ejecutar la consulta y generar la respuesta
if ($stmt->execute()) {
    $response = array("status" => "success", "message" => "Carro actualizado exitosamente.");
} else {
    $response = array("status" => "error", "message" => "Error al actualizar el carro: " . $stmt->errorInfo()[2]);
}

// Devolver la respuesta en formato JSON
header('Content-Type: application/json');
echo json_encode($response);
?>