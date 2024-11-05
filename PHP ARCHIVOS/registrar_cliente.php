<?php
// registrar_cliente.php
include 'db_connection.php';
header("Access-Control-Allow-Origin: *");  
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type"); 

// Verificar que la solicitud sea POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir los datos del formulario
    $id_cliente = $_POST['ID_cliente'];
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $correo = $_POST['correo'];
    $telefono = $_POST['telefono'];

    try {
        // Preparar la consulta SQL
        $sql = "INSERT INTO registroclientes (ID_cliente, nombre, apellido, correo, telefono) 
                VALUES (:id_cliente, :nombre, :apellido, :correo, :telefono)";
        
        // Preparar la consulta para su ejecución
        $stmt = $conn->prepare($sql);
        
        // Asignar los valores a los parámetros
        $stmt->bindParam(':id_cliente', $id_cliente);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':apellido', $apellido);
        $stmt->bindParam(':correo', $correo);
        $stmt->bindParam(':telefono', $telefono);
        
        // Ejecutar la consulta
        if ($stmt->execute()) {
            echo json_encode(["message" => "Cliente registrado con éxito"]);
        } else {
            echo json_encode(["message" => "Error al registrar el cliente"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["message" => "Error en la consulta: " . $e->getMessage()]);
    }
}
?>
