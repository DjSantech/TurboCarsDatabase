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

    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const getMinDate = () => {
        const today = new Date();
        const pastDate = new Date(today.setDate(today.getDate() - 30));
        return pastDate.toISOString().split('T')[0];
    };


    useEffect(() => {
        fetch('http://localhost/obtener_clientes.php')
            .then(response => response.json())
            .then(data => setClientes(data))
            .catch(error => console.error('Error al obtener la lista de clientes:', error));

        fetch('http://localhost/obtener_carros.php')
            .then(response => response.json())
            .then(data => setCarros(data))
            .catch(error => console.error('Error al obtener la lista de carros:', error));

        
    }, []);

    const handleCarroSeleccionado = (e) => {
        const opcionesSeleccionadas = Array.from(e.target.selectedOptions, option => option.value);
        setCarrosSeleccionados(opcionesSeleccionadas);

        const total = opcionesSeleccionadas.reduce((acc, IDcarro) => {
            const carro = carros.find(c => c.ID_carro === parseInt(IDcarro)); 
            return acc + (carro ? carro.Precio : 0);
        }, 0);
        setTotalVenta(total);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const ventaData = {
            id_cliente: idCliente,
            fecha: fecha,
            total_venta: totalVenta,
            carros: carrosSeleccionados,
        };

        fetch('http://localhost/registrar_venta.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ventaData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Venta registrada:', data);
            alert('Venta registrada con éxito');
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
                    <label>Nombre de cliente:</label>
                    <select value={idCliente} onChange={(e) => setIdCliente(e.target.value)} required>
                        <option value="">Selecciona un cliente</option>
                        {clientes.map(cliente => (
                            <option key={cliente.id_cliente} value={cliente.id_cliente}>
                                {cliente.ID_cliente} 
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Selecciona los carros:</label>
                    <select multiple value={carrosSeleccionados} onChange={handleCarroSeleccionado} required>
                        {carros.map(carro => (
                            <option key={carro.ID_carro} value={carro.ID_carro}>
                                {carro.Modelo} - ${carro.Precio}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Fecha:</label>
                    <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} min={getMinDate()} 
                        max={getTodayDate()} required />
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
