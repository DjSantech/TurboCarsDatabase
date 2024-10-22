// src/components/Login.js
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../styles/LoginStyle.css'; 

const Login = () => {
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const Navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Aquí va tu lógica de autenticación
        if (usuario === 'admin' && contraseña === '1234') {
            Navigate('/BaseDeDatos'); // Redirige al componente de base de datos
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    };

    return (
        <div className="login">
            <div className="title">
                <h1>Inicio de Sesión</h1>
            </div>
            <form onSubmit={handleLogin}>
                <label htmlFor="usuario">Usuario:</label>
                <input
                    type="text"
                    id="usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    required
                    placeholder="Usuario"
                />
                <br /><br />
                <label htmlFor="contraseña">Contraseña:</label>
                <input
                    type="password"
                    id="contraseña"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    required
                    placeholder="Contraseña"
                />
                <br /><br />
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
};

export default Login;
