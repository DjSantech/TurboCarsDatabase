import React, { useState, useEffect } from 'react';

const ModificarInventario = () => {
    const [inventario, setInventario] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [formData, setFormData] = useState({
        ID_carro: '',
        Modelo: '',
        Marca: '',
        Anio: '',
        Color: '',
        Escala: '',
        Precio: ''
    });

    useEffect(() => {
        const fetchInventario = async () => {
            try {
                const response = await fetch('http://localhost/consulta_inventario.php');
                const data = await response.json();
                setInventario(data);
            } catch (error) {
                console.error("Error al obtener el inventario:", error);
            }
        };
        fetchInventario();
    }, []);

    const handleSelectChange = (e) => {
        const id = e.target.value;
        const car = inventario.find(item => item.ID_carro === parseInt(id)); 
        setSelectedCar(car);
        if (car) {
            setFormData(car); 
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost/editar_carro.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData).toString()
            });

            const result = await response.json();
            alert(result.message); 
        } catch (error) {
            console.error("Error al modificar el carro:", error);
        }
    };

    return (
        <div className="modificar-inventario">
            <h1>Modificar Inventario</h1>
            
            <label htmlFor="carro-select">Seleccionar Carro:</label>
            <select id="carro-select" onChange={handleSelectChange}>
                <option value="">-- Selecciona un Carro --</option>
                {inventario.map((car) => (
                    <option key={car.ID_carro} value={car.ID_carro}>
                        ID: {car.ID_carro} - Carro: {car.Modelo} Marca: {car.Marca} - Año: {car.Anio} - Color: {car.color} - Escala: {car.Escala} - Precio: {car.Precio}
                    </option>
                ))}
            </select>

            {selectedCar && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="Modelo">Modelo:</label>
                    <input
                        type="text"
                        id="Modelo"
                        name="Modelo"
                        value={formData.Modelo || ''}
                        onChange={handleChange}
                        required
                    /><br /><br />

                    <label htmlFor="Marca">Marca:</label>
                    <input
                        type="text"
                        id="Marca"
                        name="Marca"
                        value={formData.Marca || ''}
                        onChange={handleChange}
                        required
                    /><br /><br />

                    <label htmlFor="Anio">Año:</label>
                    <input
                        type="number"
                        id="Anio"
                        name="Anio"
                        value={formData.Anio || ''}
                        onChange={handleChange}
                        required
                    /><br /><br />

                    <label htmlFor="color">Color:</label>
                    <input
                        type="text"
                        id="color"
                        name="color"
                        value={formData.color || ''}
                        onChange={handleChange}
                        required
                    /><br /><br />

                    <label htmlFor="Escala">Escala:</label>
                    <input
                        type="text"
                        id="Escala"
                        name="Escala"
                        value={formData.Escala || ''}
                        onChange={handleChange}
                        required
                    /><br /><br />

                    <label htmlFor="Precio">Precio:</label>
                    <input
                        type="number"
                        id="Precio"
                        name="Precio"
                        value={formData.Precio || ''}
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
