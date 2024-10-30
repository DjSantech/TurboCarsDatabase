import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'; 
import MenuBaseDatos from './components/BaseDeDatosInterfaz'; 
import RegistrarCarro from './components/RegistrarCarro';
import RegistrarVenta from './components/RegistrarVenta';
import RegistrarCliente from './components/RegistrarCliente'; 
import MostrarInventario from './components/ConsultaInventario'; 
import ModificacionInventario from './components/ModificacionInventario'; 

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/BaseDeDatos" element={<MenuBaseDatos/>} />
                <Route path="/registrar-carro" element={<RegistrarCarro />} />
                <Route path="/registrar-venta" element={<RegistrarVenta />} />
                <Route path="/registrar-cliente" element={<RegistrarCliente />} />
                <Route path="/consulta-inventario" element={<MostrarInventario />} />
                <Route path="/modificacion-inventario" element={<ModificacionInventario />} />
            </Routes>
        </Router>
    );
};

export default App;
