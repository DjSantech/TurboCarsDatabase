import React, { useState, useEffect } from 'react';
import '../styles/MostrarInventario.css'; 

const MostrarInventario = () => {
    const [carros, setCarros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCarros = async () => {
            try {
                const response = await fetch('http://localhost/consulta_inventario.php');
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
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carros.map((carro, index) => (
                            <tr key={index}>
                                <td>{carro.ID_carro}</td>
                                <td>{carro.Modelo}</td>
                                <td>{carro.Marca}</td>
                                <td>{carro.Anio}</td>
                                <td>{carro.color}</td>
                                <td>{carro.Escala}</td>
                                <td>{carro.Precio}</td>
                                <td>{carro.Estado}</td>
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
