<?php
include 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id_inventario = $_POST['id_inventario'];
    $modelo = $_POST['modelo'];
    $marca = $_POST['marca'];
    $anio = $_POST['año'];
    $color = $_POST['color'];
    $escala = $_POST['Escala'];
    $precio = $_POST['precio'];

    try {
        $sql = "UPDATE inventario 
                SET modelo = :modelo, marca = :marca, año = :anio, color = :color, escala = :escala, precio = :precio 
                WHERE id_inventario = :id_inventario";
        
        $stmt = $conn->prepare($sql);
        
        $stmt->bindParam(':id_inventario', $id_inventario);
        $stmt->bindParam(':modelo', $modelo);
        $stmt->bindParam(':marca', $marca);
        $stmt->bindParam(':anio', $anio);
        $stmt->bindParam(':color', $color);
        $stmt->bindParam(':escala', $escala);
        $stmt->bindParam(':precio', $precio);
        
        if ($stmt->execute()) {
            echo json_encode(["message" => "Carro modificado con éxito"]);
        } else {
            echo json_encode(["message" => "Error al modificar el carro"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["message" => "Error en la consulta: " . $e->getMessage()]);
    }
}
?>
