import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/RegistrarVenta.css';
import axios from 'axios';

const RegistrarVenta = () => {
    const [clientes, setClientes] = useState([]);
    const [idCliente, setIdCliente] = useState('');
    const [fecha, setFecha] = useState('');
    const [totalVenta, setTotalVenta] = useState('');

    useEffect(() => {
        // Obtener la lista de clientes de la base de datos
        axios.get('http://localhost/tu_carpeta_php/obtener_clientes.php')
            .then(response => {
                setClientes(response.data);
            })
            .catch(error => {
                console.error('Error al obtener la lista de clientes:', error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const ventaData = {
            id_cliente: idCliente,
            fecha: fecha,
            total_venta: totalVenta
        };

        // Hacer la petición POST al archivo PHP para registrar la venta
        axios.post('http://localhost/tu_carpeta_php/registrar_venta.php', ventaData)
            .then(response => {
                console.log('Venta registrada:', response.data);
                // Aquí puedes manejar la respuesta después de registrar la venta
            })
            .catch(error => {
                console.error('Hubo un error al registrar la venta:', error);
            });
    };
    
    return (

        <div className='registrar-venta'>
            <h2>Registrar Venta</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID Cliente:</label>
                    <select value={idCliente} onChange={(e) => setIdCliente(e.target.value)} required>
                        <option value="">Selecciona un cliente</option>
                        {clientes.map(cliente => (
                            <option key={cliente.id_cliente} value={cliente.id_cliente}>
                                {cliente.nombre} {cliente.apellido}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Fecha:</label>
                    <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
                </div>
                <div>
                    <label>Total Venta:</label>
                    <input type="number" value={totalVenta} onChange={(e) => setTotalVenta(e.target.value)} required />
                </div>
                <div className="botones-ventas">
                <button type="submit">Registrar Venta</button>
                <Link to="/registrar-cliente"><button >Registrar Cliente</button></Link>
                <Link to="/BaseDeDatos"><button >Volver al menu</button></Link>
                </div>
            </form>
        </div>
    );
};


export default RegistrarVenta;
