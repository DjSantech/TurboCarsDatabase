import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/RegistrarClientes.css'; 


const RegistrarCliente = () => {
    const [formData, setFormData] = useState({
        ID_cliente:'',
        nombre: '',
        apellido: '',
        correo: '',
        telefono: ''
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

        try {
            const response = await fetch('http://localhost/registrar_cliente.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData).toString()
            });

            const result = await response.json();
            alert(result.message);
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    return (
        <div className="registrar-cliente">
            <h1>Registrar Nuevo Cliente</h1>
            <form onSubmit={handleSubmit}>
                
                <div>
                    <label htmlFor="ID_cliente">ID Cliente:</label>
                    <input
                        type="text"
                        name="ID_cliente"
                        value={formData.ID_cliente}
                        onChange={handleChange}
                        required
                    />
                </div>
                <label htmlFor="nombre">Nombre:</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                /><br /><br />

                <label htmlFor="apellido">Apellido:</label>
                <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                /><br /><br />

                <label htmlFor="correo">Correo:</label>
                <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    required
                /><br /><br />

                <label htmlFor="telefono">Teléfono:</label>
                <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                /><br /><br />

                <div className='botones-clientes'>
                <input type="submit" value="Registrar Cliente" />
                <Link to="/BaseDeDatos"><button>Volver al menú</button></Link>
                </div>
                </form>
        </div>
    );
};

export default RegistrarCliente;
