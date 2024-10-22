// src/components/RegistrarCarro.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/RegistrarCarro.css'; 

const RegistrarCarro = () => {
    const [formData, setFormData] = useState({
        modelo: '',
        marca: '',
        año: '',
        color: '',
        precio: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Enviar los datos al servidor PHP
        try {
            const response = await fetch('http://localhost/registrar_carro.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', // Esto es necesario para PHP
                },
                body: new URLSearchParams(formData).toString() // Convertir los datos a un formato adecuado para PHP
            });

            const result = await response.json();
            alert(result.message); // Mostrar el mensaje de éxito o error
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    return (
        <div className="registrar-carro">
            <h1>Registrar Nuevo Carro</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="modelo">Modelo:</label>
                <input
                    type="text"
                    id="modelo"
                    name="modelo"
                    value={formData.modelo}
                    onChange={handleChange}
                    placeholder="Modelo"
                    required
                /><br /><br />

                <label htmlFor="marca">Marca:</label>
                <input
                    type="text"
                    id="marca"
                    name="marca"
                    value={formData.marca}
                    onChange={handleChange}
                    placeholder="Marca"
                    required
                /><br /><br />

                <label htmlFor="año">Año:</label>
                <input
                    type="number"
                    id="año"
                    name="año"
                    value={formData.año}
                    onChange={handleChange}
                    placeholder="Año"
                    required
                /><br /><br />

                <label htmlFor="color">Color:</label>
                <input
                    type="text"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="Color"
                    required
                /><br /><br />

                <label htmlFor="Escala">Escala:</label>
                <input
                    type="text"
                    id="Escala"
                    name="Escala"
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="Escala"
                    required
                /><br /><br />

                <label htmlFor="precio">Precio:</label>
                <input
                    type="number"
                    id="precio"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    placeholder="Precio"
                    required
                /><br /><br />
                
                <div className="botones-carros">
                <Link to="/BaseDeDatos"><button>Volver al menu</button></Link>
                <input type="submit" value="Registrar Carro" />
                </div>
            </form>
        </div>
    );
};

export default RegistrarCarro;
