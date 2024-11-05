<?php
include 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id_inventario = $_POST['id_inventario'];

    try {
        $sql = "DELETE FROM inventario WHERE id_inventario = :id_inventario";
        
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id_inventario', $id_inventario);
        
        if ($stmt->execute()) {
            echo json_encode(["message" => "Carro eliminado con éxito"]);
        } else {
            echo json_encode(["message" => "Error al eliminar el carro"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["message" => "Error en la consulta: " . $e->getMessage()]);
    }
}
?>
