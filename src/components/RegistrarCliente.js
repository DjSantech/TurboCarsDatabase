import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/RegistrarClientes.css'; // Asegúrate de tener un archivo CSS para los estilos

const RegistrarCliente = () => {
    const [cliente, setCliente] = useState({
        id: '',
        nombre: '',
        apellido: '',
        correo: '',
        telefono: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente({ ...cliente, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar los datos a tu servidor
        console.log(cliente);
        // Puedes hacer una solicitud POST para enviar la información
    };

    return (
        <div className="registrar-cliente">
            <h2>Registrar Cliente</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID Cliente:</label>
                    <input
                        type="text"
                        name="id"
                        value={cliente.id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={cliente.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Apellido:</label>
                    <input
                        type="text"
                        name="apellido"
                        value={cliente.apellido}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Correo:</label>
                    <input
                        type="email"
                        name="correo"
                        value={cliente.correo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Teléfono:</label>
                    <input
                        type="tel"
                        name="telefono"
                        value={cliente.telefono}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="botones-clientes">
                <button type="submit">Registrar Cliente</button>
                <Link to="/BaseDeDatos"><button >Volver al menu</button></Link>
                </div>
            </form>
        </div>
    );
};

export default RegistrarCliente;
