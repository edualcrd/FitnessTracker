import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import workoutService from '../services/workoutService';
import toast from 'react-hot-toast';
import { ArrowLeft, PlusCircle, Activity } from 'lucide-react';

const WorkoutDetailPage = () => {
  const { id } = useParams(); // Captura el ID de la URL
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Estado para el formulario de nuevo ejercicio
  const [newExercise, setNewExercise] = useState({ name: '', sets: 3, reps: 10 });

  const fetchWorkout = async () => {
    try {
      const data = await workoutService.getById(id);
      setWorkout(data);
    } catch (error) {
      toast.error('Error al cargar la rutina');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkout();
  }, [id]);

  const handleAddExercise = async (e) => {
    e.preventDefault();
    try {
      await workoutService.addExercise(id, newExercise);
      toast.success('Ejercicio añadido');
      setNewExercise({ name: '', sets: 3, reps: 10 }); // Reset form
      fetchWorkout(); // Recargar datos para ver el nuevo ejercicio
    } catch (error) {
      toast.error('Error al añadir ejercicio');
    }
  };

  if (loading) return <div className="text-center p-10">Cargando...</div>;

  return (
    <div className="auth-wrapper" style={{ alignItems: 'flex-start', paddingTop: '2rem', gap: '2rem', flexDirection: 'column' }}>
      
      {/* Tarjeta Principal: Detalles de la Rutina */}
      <div className="card" style={{ maxWidth: '800px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <button onClick={() => navigate('/dashboard')} className="btn-icon">
            <ArrowLeft size={24} /> Volver
          </button>
          <span className={`badge ${workout.difficulty}`} style={{ fontSize: '1rem' }}>
            {workout.difficulty}
          </span>
        </div>
        
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
          {workout.title}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          {workout.description || 'Sin descripción'}
        </p>
      </div>

      {/* Sección de Ejercicios (Relación 1:N) */}
      <div className="card" style={{ maxWidth: '800px', width: '100%' }}>
        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Activity color="var(--secondary)" /> Ejercicios de la sesión
        </h3>

        {/* Lista de ejercicios existentes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {workout.exercises && workout.exercises.length > 0 ? (
            workout.exercises.map((ex) => (
              <div key={ex.id} style={{ 
                background: 'var(--bg-input)', 
                padding: '1rem', 
                borderRadius: 'var(--radius)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontWeight: 'bold' }}>{ex.name}</span>
                <span style={{ color: 'var(--text-muted)' }}>
                  {ex.sets} series x {ex.reps} reps
                </span>
              </div>
            ))
          ) : (
            <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
              No hay ejercicios todavía. ¡Añade el primero abajo!
            </p>
          )}
        </div>

        <div className="divider"><span>AÑADIR NUEVO EJERCICIO</span></div>

        {/* Formulario para añadir ejercicio (Formulario Dinámico) */}
        <form onSubmit={handleAddExercise} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: 2, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Nombre Ejercicio</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Ej: Press Banca" 
              value={newExercise.name}
              onChange={(e) => setNewExercise({...newExercise, name: e.target.value})}
              required
            />
          </div>
          <div style={{ flex: 1, minWidth: '80px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Series</label>
            <input 
              type="number" 
              className="input-field" 
              value={newExercise.sets}
              onChange={(e) => setNewExercise({...newExercise, sets: e.target.value})}
            />
          </div>
          <div style={{ flex: 1, minWidth: '80px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Reps</label>
            <input 
              type="number" 
              className="input-field" 
              value={newExercise.reps}
              onChange={(e) => setNewExercise({...newExercise, reps: e.target.value})}
            />
          </div>
          <button type="submit" className="btn btn-outline" style={{ height: '46px' }}>
            <PlusCircle size={20} /> Añadir
          </button>
        </form>
      </div>
    </div>
  );
};

export default WorkoutDetailPage;