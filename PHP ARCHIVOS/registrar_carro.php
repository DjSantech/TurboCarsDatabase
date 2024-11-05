<?php
// registrar_carro.php
include 'db_connection.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir los datos del formulario
    $modelo = $_POST['modelo'];
    $marca = $_POST['marca'];
    $anio = $_POST['año'];
    $color = $_POST['color'];
    $escala = $_POST['escala'];
    $precio = $_POST['precio'];
    $estado = $_POST['estado'];

    try {
        // Preparar la consulta SQL
        $sql = "INSERT INTO ingreso_carro (modelo, Marca, Anio, color, Escala, Precio, Estado) 
                VALUES (:modelo, :marca, :anio, :color, :escala, :precio, :estado)";
        
        // Preparar la consulta para su ejecución
        $stmt = $conn->prepare($sql);
        
        // Asignar los valores a los parámetros
        $stmt->bindParam(':modelo', $modelo);
        $stmt->bindParam(':marca', $marca);
        $stmt->bindParam(':anio', $anio);
        $stmt->bindParam(':color', $color);
        $stmt->bindParam(':escala', $escala);
        $stmt->bindParam(':precio', $precio);
        $stmt->bindParam(':estado', $estado);
        
        // Ejecutar la consulta
        if ($stmt->execute()) {
            echo json_encode(["message" => "Carro registrado con éxito"]);
        } else {
            echo json_encode(["message" => "Error al registrar el carro"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["message" => "Error en la consulta: " . $e->getMessage()]);
    }
}
?>
