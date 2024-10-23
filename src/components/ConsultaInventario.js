// src/components/MostrarInventario.js
import React, { useState, useEffect } from 'react';
import '../styles/MostrarInventario.css'; // Puedes crear estilos para este componente

const MostrarInventario = () => {
    const [carros, setCarros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Función para obtener los carros desde el servidor PHP
        const fetchCarros = async () => {
            try {
                const response = await fetch('http://localhost/consultar_inventario.php');
                const data = await response.json();
                if (Array.isArray(data)) {
                    setCarros(data);
                } else {
                    setError(data.message || "Error al obtener los datos");
                }
            } catch (error) {
                console.error("Error en la solicitud:", error);
                setError("No se pudo conectar con el servidor");
            } finally {
                setLoading(false);
            }
        };

        fetchCarros();
    }, []);

    if (loading) {
        return <p>Cargando inventario...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="mostrar-inventario">
            <h1>Inventario de Carros</h1>
            {carros.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Modelo</th>
                            <th>Marca</th>
                            <th>Año</th>
                            <th>Color</th>
                            <th>Escala</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carros.map((carro, index) => (
                            <tr key={index}>
                                <td>{carro.id}</td>
                                <td>{carro.modelo}</td>
                                <td>{carro.marca}</td>
                                <td>{carro.año}</td>
                                <td>{carro.color}</td>
                                <td>{carro.escala}</td>
                                <td>{carro.precio}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay carros registrados en el inventario</p>
            )}
        </div>
    );
};

export default MostrarInventario;
