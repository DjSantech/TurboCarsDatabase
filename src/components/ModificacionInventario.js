// src/components/ModificarInventario.js
import React, { useState, useEffect } from 'react';

const ModificarInventario = () => {
    const [inventario, setInventario] = useState([]); // Lista de IDs de inventario
    const [selectedCar, setSelectedCar] = useState(null); // Carro seleccionado
    const [formData, setFormData] = useState({
        id_inventario: '',
        id_c_carro: '',
        fecha_ingreso: ''
    });

    // Función para obtener el inventario desde la base de datos
    useEffect(() => {
        const fetchInventario = async () => {
            try {
                const response = await fetch('http://localhost/obtener_inventario.php');
                const data = await response.json();
                setInventario(data);
            } catch (error) {
                console.error("Error al obtener el inventario:", error);
            }
        };

        fetchInventario();
    }, []);

    // Manejar la selección del carro
    const handleSelectChange = (e) => {
        const id = e.target.value;
        const car = inventario.find(item => item.id_inventario === id);
        setSelectedCar(car);
        setFormData(car); // Llenar los datos del carro seleccionado
    };

    // Manejar el cambio en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost/modificar_inventario.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData).toString()
            });

            const result = await response.json();
            alert(result.message); // Mostrar el mensaje de éxito o error
        } catch (error) {
            console.error("Error al modificar el inventario:", error);
        }
    };

    return (
        <div className="modificar-inventario">
            <h1>Modificar Inventario</h1>
            
            {/* Selector de carro */}
            <label htmlFor="carro-select">Seleccionar Carro:</label>
            <select id="carro-select" onChange={handleSelectChange} value={selectedCar ? selectedCar.id_inventario : ''}>
                <option value="">-- Selecciona un Carro --</option>
                {inventario.map(car => (
                    <option key={car.id_inventario} value={car.id_inventario}>
                        ID: {car.id_inventario} - Carro: {car.id_c_carro}
                    </option>
                ))}
            </select>

            {/* Formulario para modificar el carro seleccionado */}
            {selectedCar && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="id_c_carro">ID Carro:</label>
                    <input
                        type="text"
                        id="id_c_carro"
                        name="id_c_carro"
                        value={formData.id_c_carro}
                        onChange={handleChange}
                        required
                    /><br /><br />

                    <label htmlFor="fecha_ingreso">Fecha de Ingreso:</label>
                    <input
                        type="date"
                        id="fecha_ingreso"
                        name="fecha_ingreso"
                        value={formData.fecha_ingreso}
                        onChange={handleChange}
                        required
                    /><br /><br />

                    <button type="submit">Guardar Cambios</button>
                </form>
            )}
        </div>
    );
};

export default ModificarInventario;
