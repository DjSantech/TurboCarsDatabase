import { Link } from 'react-router-dom';
import '../styles/Interfaz.css'; 

const MenuBaseDatos = () => {
    return (
        <div className="menu">
            <h2>¿Qué quieres hacer?</h2>
            <ul>
                <li><Link to="/registrar-carro">Registrar Carro</Link></li>
                <li><Link to="/registrar-venta">Registrar Venta</Link></li>
                <li><Link to="/registrar-cliente">Registrar Cliente</Link></li>
                <li><Link to="/consulta-inventario">Consulta de Inventario</Link></li>
                <li><Link to="/modificacion-inventario">Modificación de Inventario</Link></li>
            </ul>
        </div>
    );
};




export default MenuBaseDatos;