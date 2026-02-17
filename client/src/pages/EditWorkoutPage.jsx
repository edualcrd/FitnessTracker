import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import workoutService from '../services/workoutService';
import toast from 'react-hot-toast';
import { Save, ArrowLeft } from 'lucide-react';

const EditWorkoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'Medium'
  });

  // Cargar datos originales al entrar
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await workoutService.getById(id);
        setFormData({
          title: data.title,
          description: data.description,
          difficulty: data.difficulty
        });
      } catch (error) {
        toast.error('Error al cargar datos');
        navigate('/dashboard');
      }
    };
    loadData();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await workoutService.update(id, formData);
      toast.success('Rutina actualizada');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Error al actualizar');
    }
  };

  return (
    <div className="auth-wrapper" style={{ alignItems: 'flex-start', paddingTop: '2rem' }}>
      <div className="card" style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <button onClick={() => navigate('/dashboard')} className="btn-icon">
            <ArrowLeft size={24} />
          </button>
          <h2>Editar Rutina</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título</label>
            <input 
              className="input-field" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
            />
          </div>
          
          <div className="form-group">
            <label>Dificultad</label>
            <select 
              className="input-field" 
              value={formData.difficulty}
              onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea 
              className="input-field" 
              rows="4"
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            <Save size={20} /> Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditWorkoutPage;