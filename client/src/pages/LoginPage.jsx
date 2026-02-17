import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { LogIn } from 'lucide-react'; // Mantenemos los iconos, son ligeros

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Iniciando sesión...');
    
    try {
      const data = await authService.login(email, password);
      login(data.user, data.token);
      toast.dismiss(loadingToast);
      toast.success(`¡Bienvenido, ${data.user.username}!`);
      navigate('/dashboard');
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="card">
        <div className="card-header">
          <h2>FitTracker</h2>
          <p style={{ color: 'var(--text-muted)' }}>Tu gimnasio en casa</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input 
              type="email" 
              className="input-field" 
              placeholder="nombre@ejemplo.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              className="input-field" 
              placeholder="••••••••"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            <LogIn size={20} /> Entrar
          </button>
        </form>

        <div className="divider">
          <span>O</span>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>¿Nuevo aquí?</p>
          <Link to="/register" className="btn btn-outline" style={{ width: '100%' }}>
            Crear cuenta gratis
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;