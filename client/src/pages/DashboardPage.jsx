import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import workoutService from "../services/workoutService";
import authService from "../services/authService";
import toast from "react-hot-toast";
import StatsCharts from "../components/StatsCharts";
import WorkoutSkeleton from "../components/WorkoutSkeleton";
import {
  Camera,
  Plus,
  Trash2,
  Eye,
  Edit,
  Filter,
  Search,
  Calendar,
  Dumbbell
} from "lucide-react";

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDifficulty, setFilterDifficulty] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [avatar, setAvatar] = useState(user?.avatar || null);

  const fetchWorkouts = async () => {
    try {
      const data = await workoutService.getAll();
      setWorkouts(data);
      setLoading(false);
    } catch (error) {
      toast.error("Error al cargar rutinas");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta rutina permanentemente?")) return;
    try {
      await workoutService.delete(id);
      toast.success("Rutina eliminada");
      setWorkouts(workouts.filter((w) => w.id !== id));
    } catch (error) {
      toast.error("No se pudo eliminar");
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);
    const loadingToast = toast.loading("Actualizando perfil...");

    try {
      const data = await authService.uploadAvatar(formData);
      const fullUrl = `http://localhost:3000/${data.avatar}`;
      setAvatar(fullUrl);
      const updatedUser = { ...user, avatar: fullUrl };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.dismiss(loadingToast);
      toast.success("Perfil actualizado");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Error al subir imagen");
    }
  };

  const filteredWorkouts = workouts.filter((workout) => {
    const matchesDifficulty = filterDifficulty ? workout.difficulty === filterDifficulty : true;
    const matchesSearch = workout.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  return (
    <div className="dashboard-container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* --- HEADER PREMIUM --- */}
      <header className="dashboard-header" style={{ marginBottom: '3rem', paddingTop: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div className="avatar-container" style={{ width: '85px', height: '85px' }}>
                <img 
                    src={avatar || `https://ui-avatars.com/api/?name=${user?.username}&background=random`} 
                    alt="Perfil" 
                    className="avatar-img"
                />
                <label 
                    htmlFor="avatar-upload" 
                    className="btn-icon"
                    style={{ 
                        position: 'absolute', bottom: '0', right: '-5px', 
                        background: '#1e1e1e', border: '1px solid #333',
                        borderRadius: '50%', padding: '8px', cursor: 'pointer',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
                    }}
                >
                    <Camera size={16} color="var(--primary)" />
                    <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
                </label>
            </div>

            <div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.2rem', background: 'linear-gradient(90deg, #fff, #aaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Hola, {user?.username}
                </h1>
                <p style={{ color: "var(--text-muted)", fontSize: '1.1rem' }}>Vamos a entrenar duro hoy.</p>
            </div>
        </div>

        <Link to="/create-workout" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '1rem' }}>
          <Plus size={22} /> Crear Nueva Rutina
        </Link>
      </header>

      {/* --- GRÁFICOS (Solo si hay datos) --- */}
      {!loading && workouts.length > 0 && (
         <div style={{ marginBottom: '3rem' }}>
             <StatsCharts workouts={workouts} />
         </div>
      )}

      {/* --- TOOLBAR FLOTANTE --- */}
      <div className="toolbar-glass">
        <div className="search-input-wrapper" style={{ flex: 1 }}>
          <Search size={18} className="search-icon-abs" />
          <input
            type="text"
            className="input-glass"
            style={{ width: '100%', paddingLeft: '40px' }}
            placeholder="Buscar rutina..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }}></div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Filter size={18} color="var(--text-muted)" />
          <select
            className="input-glass"
            style={{ minWidth: '150px', cursor: 'pointer' }}
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
          >
            <option value="">Todas las dificultades</option>
            <option value="Easy">Principiante (Easy)</option>
            <option value="Medium">Intermedio (Medium)</option>
            <option value="Hard">Avanzado (Hard)</option>
          </select>
        </div>
      </div>

      {/* --- GRID DE CONTENIDO --- */}
      {loading ? (
        <div className="workout-grid">
          {[1,2,3].map(i => <WorkoutSkeleton key={i} />)}
        </div>
      ) : filteredWorkouts.length === 0 ? (
        <div className="empty-state card-glass" style={{ padding: '4rem', textAlign: 'center' }}>
          <Dumbbell size={48} color="var(--text-muted)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h3>No se encontraron rutinas</h3>
          <p style={{ marginBottom: '2rem' }}>Parece que no hay nada por aquí con esos filtros.</p>
          <button onClick={() => {setFilterDifficulty(''); setSearchTerm('');}} className="btn btn-outline">
            Limpiar Filtros
          </button>
        </div>
      ) : (
        <div className="workout-grid">
          {filteredWorkouts.map((workout) => (
            <div key={workout.id} className="workout-card card-glass" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              
              {/* Card Header */}
              <div style={{ padding: '1.5rem', paddingBottom: '0.5rem' }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <span className={`badge-pill ${workout.difficulty}`}>
                    {workout.difficulty}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    <Calendar size={14} />
                    {new Date(workout.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                  </div>
                </div>
                
                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem', lineHeight: '1.3' }}>
                    {workout.title}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: '0.95rem', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {workout.description}
                </p>
              </div>

              {/* Separador sutil */}
              <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)' }}></div>

              {/* Card Actions */}
              <div style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)' }}>
                <Link to={`/workout/${workout.id}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '600' }}>
                   Ver Detalles <Eye size={16} />
                </Link>

                <div style={{ display: 'flex', gap: '8px' }}>
                    <Link to={`/edit-workout/${workout.id}`} className="btn-icon" title="Editar">
                        <Edit size={18} />
                    </Link>
                    <button onClick={() => handleDelete(workout.id)} className="btn-icon delete" title="Eliminar">
                        <Trash2 size={18} />
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;