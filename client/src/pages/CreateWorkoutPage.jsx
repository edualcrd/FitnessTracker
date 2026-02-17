import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import workoutService from '../services/workoutService';
import toast from 'react-hot-toast';
import { Dumbbell, Save, ArrowLeft } from 'lucide-react';

const CreateWorkoutPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'Medium' // Valor por defecto
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Guardando rutina...');

    try {
      const response = await workoutService.create(formData);
      toast.dismiss(loadingToast);
      toast.success('¡Rutina creada! Ahora añade ejercicios.');
      
      // TRUCO PRO: Redirigimos al detalle para añadir ejercicios inmediatamente
      // Asumimos que el backend devuelve { message, workoutId }
      navigate(`/workout/${response.workoutId}`); 
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Error al crear la rutina');
    }
  };

  return (
    <div className="auth-wrapper" style={{ alignItems: 'flex-start', paddingTop: '2rem' }}>
      <div className="card" style={{ maxWidth: '600px' }}>
        
        {/* Cabecera con botón de volver */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <button onClick={() => navigate(-1)} className="btn-icon">
            <ArrowLeft size={24} />
          </button>
          <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Nueva Rutina</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Título */}
          <div className="form-group">
            <label>Nombre de la Rutina</label>
            <input 
              type="text" 
              name="title"
              className="input-field" 
              placeholder="" 
              value={formData.title} 
              onChange={handleChange} 
              required 
              autoFocus
            />
          </div>

          {/* Dificultad (Select estilizado) */}
          <div className="form-group">
            <label>Nivel de Dificultad</label>
            <div style={{ position: 'relative' }}>
              <select 
                name="difficulty" 
                className="input-field" 
                value={formData.difficulty}
                onChange={handleChange}
                style={{ appearance: 'none', cursor: 'pointer' }}
              >
                <option value="Easy">Principiante</option>
                <option value="Medium">Intermedio</option>
                <option value="Hard">Avanzado</option>
              </select>
              <Dumbbell 
                size={16} 
                style={{ position: 'absolute', right: '15px', top: '15px', color: 'var(--text-muted)' }} 
              />
            </div>
          </div>

          {/* Descripción */}
          <div className="form-group">
            <label>Descripción / Objetivos</label>
            <textarea 
              name="description"
              className="input-field" 
              rows="4" 
              placeholder=""
              value={formData.description} 
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Botón Guardar */}
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            <Save size={20} /> Guardar y Añadir Ejercicios
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateWorkoutPage;