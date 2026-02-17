import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import toast from 'react-hot-toast';
import { UserPlus, User, Mail, Lock, ArrowRight } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Creando tu cuenta...');

    try {
      await authService.register(formData.username, formData.email, formData.password);
      toast.dismiss(loadingToast);
      toast.success('¡Registro exitoso! Ahora inicia sesión.');
      navigate('/login');
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(err.response?.data?.message || 'Error al registrarse');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="card">
        <div className="card-header">
          <h2>Únete al Club</h2>
          <p style={{ color: 'var(--text-muted)' }}>Empieza tu transformación hoy</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Campo Usuario */}
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={16} color="var(--primary)" /> Nombre de Usuario
            </label>
            <input 
              type="text" 
              name="username"
              className="input-field"
              placeholder="Tu nombre de usuario"
              value={formData.username} 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Campo Email */}
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={16} color="var(--primary)" /> Correo Electrónico
            </label>
            <input 
              type="email" 
              name="email"
              className="input-field"
              placeholder="tu@email.com"
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Campo Contraseña */}
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={16} color="var(--primary)" /> Contraseña
            </label>
            <input 
              type="password" 
              name="password"
              className="input-field"
              placeholder="Mínimo 6 caracteres"
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            <UserPlus size={20} /> Crear Cuenta
          </button>
        </form>

        <div className="divider">
          <span>O</span>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>¿Ya tienes cuenta?</p>
          <Link to="/login" className="btn btn-outline" style={{ width: '100%' }}>
            Iniciar Sesión <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;