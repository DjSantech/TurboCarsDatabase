// src/components/RegistrarCliente.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrarCliente = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cliente = { nombre, email, telefono };

        try {
            const response = await fetch('http://localhost/tu_api/registrar_cliente.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cliente),
            });

            if (response.ok) {
                // Si el registro es exitoso, redirigir a la interfaz de la base de datos
                navigate('/basededatos');
            } else {
                console.error('Error al registrar el cliente');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="registrar-cliente">
            <h2>Registrar Cliente</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="telefono">Teléfono:</label>
                    <input
                        type="tel"
                        id="telefono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default RegistrarCliente;
