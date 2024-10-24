import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/RegistrarVenta.css';

const RegistrarVenta = () => {
    const [clientes, setClientes] = useState([]);
    const [idCliente, setIdCliente] = useState('');
    const [fecha, setFecha] = useState('');
    const [totalVenta, setTotalVenta] = useState(0);
    const [carros, setCarros] = useState([]);
    const [carrosSeleccionados, setCarrosSeleccionados] = useState([]);

    useEffect(() => {
        // Obtener la lista de clientes
        fetch('http://localhost/tu_carpeta_php/obtener_clientes.php')
            .then(response => response.json())
            .then(data => setClientes(data))
            .catch(error => console.error('Error al obtener la lista de clientes:', error));

        // Obtener la lista de carros
        fetch('http://localhost/tu_carpeta_php/obtener_carros.php')
            .then(response => response.json())
            .then(data => setCarros(data))
            .catch(error => console.error('Error al obtener la lista de carros:', error));
    }, []);

    const handleCarroSeleccionado = (e) => {
        const opcionesSeleccionadas = Array.from(e.target.selectedOptions, option => option.value);
        setCarrosSeleccionados(opcionesSeleccionadas);

        // Calcular el total sumando los precios de los carros seleccionados
        const total = opcionesSeleccionadas.reduce((acc, idCarro) => {
            const carro = carros.find(c => c.id_carro === idCarro);
            return acc + (carro ? carro.precio : 0);
        }, 0);
        setTotalVenta(total);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const ventaData = {
            id_cliente: idCliente,
            fecha: fecha,
            total_venta: totalVenta,
            carros: carrosSeleccionados // Enviar los carros seleccionados
        };

        // Enviar los datos al servidor
        fetch('http://localhost/tu_carpeta_php/registrar_venta.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ventaData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Venta registrada:', data);
        })
        .catch(error => {
            console.error('Error al registrar la venta:', error);
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
                    <label>Selecciona los carros:</label>
                    <select multiple value={carrosSeleccionados} onChange={handleCarroSeleccionado} required>
                        {carros.map(carro => (
                            <option key={carro.id_carro} value={carro.id_carro}>
                                {carro.modelo} - ${carro.precio}
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
                    <input type="number" value={totalVenta} readOnly />
                </div>
                <div className="botones-ventas">
                    <button type="submit">Registrar Venta</button>
                    <Link to="/registrar-cliente"><button>Registrar Cliente</button></Link>
                    <Link to="/BaseDeDatos"><button>Volver al menú</button></Link>
                </div>
            </form>
        </div>
    );
};

export default RegistrarVenta;
