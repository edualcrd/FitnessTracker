import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Dumbbell } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada correctamente');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* Logo / Título */}
      <Link to={user ? "/dashboard" : "/login"} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Dumbbell color="var(--primary)" size={28} />
        <h1>FitTracker Pro</h1>
      </Link>

      {/* Acciones */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {user ? (
          <>
            <span style={{ color: 'var(--text-muted)', marginRight: '10px' }}>
              Hola, <strong>{user.username}</strong>
            </span>
            <button 
              onClick={handleLogout} 
              className="btn btn-outline" 
              style={{ padding: '8px 16px', fontSize: '0.9rem' }}
            >
              <LogOut size={16} /> Salir
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
             {/* Aquí podrías poner botones de Login/Registro si quisieras mostrar la navbar fuera */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;