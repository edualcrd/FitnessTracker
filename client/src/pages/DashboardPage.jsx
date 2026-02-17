import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import workoutService from "../services/workoutService";
import authService from "../services/authService";
import toast from "react-hot-toast";
import StatsCharts from "../components/StatsCharts"; // <--- El componente PRO
import WorkoutSkeleton from "../components/WorkoutSkeleton";
import {
  Camera,
  Plus,
  Trash2,
  Eye,
  Edit,
  Filter,
  Search,
} from "lucide-react";

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterDifficulty, setFilterDifficulty] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Estado para el avatar
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
    if (!window.confirm("¿Seguro que quieres eliminar esta rutina?")) return;
    try {
      await workoutService.delete(id);
      toast.success("Rutina eliminada");
      setWorkouts(workouts.filter((w) => w.id !== id));
    } catch (error) {
      toast.error("No se pudo eliminar");
    }
  };

  // Función para subir avatar
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    const loadingToast = toast.loading("Subiendo imagen...");
    try {
      const data = await authService.uploadAvatar(formData);

      // Actualizamos la URL localmente
      const fullUrl = `http://localhost:3000/${data.avatar}`;
      setAvatar(fullUrl);

      // Persistencia en localStorage
      const updatedUser = { ...user, avatar: fullUrl };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.dismiss(loadingToast);
      toast.success("¡Foto de perfil actualizada!");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Error al subir imagen");
    }
  };

  const filteredWorkouts = workouts.filter((workout) => {
    const matchesDifficulty = filterDifficulty
      ? workout.difficulty === filterDifficulty
      : true;
    const matchesSearch = workout.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  return (
    <div className="dashboard-container">
      {/* HEADER con Avatar y Botón Nueva Rutina */}
      <header className="dashboard-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* CÍRCULO DEL AVATAR */}
            <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                <img 
                    src={avatar || "https://ui-avatars.com/api/?name=" + user?.username + "&background=random"} 
                    alt="Perfil" 
                    style={{ 
                        width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover',
                        border: '3px solid var(--primary)', boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                    }}
                />
                <label 
                    htmlFor="avatar-upload" 
                    style={{ 
                        position: 'absolute', bottom: '0', right: '0', 
                        background: 'var(--bg-card)', border: '1px solid var(--text-muted)',
                        borderRadius: '50%', padding: '5px', cursor: 'pointer', display: 'flex'
                    }}
                    title="Cambiar foto"
                >
                    <Camera size={14} color="white" />
                    <input 
                        id="avatar-upload" 
                        type="file" 
                        accept="image/*" 
                        onChange={handleAvatarChange} 
                        style={{ display: 'none' }} 
                    />
                </label>
            </div>

            <div className="dashboard-title">
                <h2>Hola, {user?.username} 👋</h2>
                <p style={{ color: "var(--text-muted)" }}>Aquí tienes tus progresos</p>
            </div>
        </div>

        <Link to="/create-workout" className="btn btn-primary">
          <Plus size={20} /> Nueva Rutina
        </Link>
      </header>

      {/* GRÁFICOS INTERACTIVOS (Reemplaza a la barra manual) */}
      {!loading && workouts.length > 0 && (
         <StatsCharts workouts={workouts} />
      )}

      {/* TOOLBAR (Buscador y Filtros) */}
      <div className="toolbar">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon-abs" />
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Filter size={20} color="var(--text-muted)" />
          <select
            className="select-filter"
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
          >
            <option value="">Todas</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      {/* GRID CON SKELETONS Y TARJETAS */}
      {loading ? (
        <div className="workout-grid">
          <WorkoutSkeleton />
          <WorkoutSkeleton />
          <WorkoutSkeleton />
        </div>
      ) : filteredWorkouts.length === 0 ? (
        <div className="empty-state">
          <h3>No se encontraron rutinas</h3>
          <p>Prueba con otros filtros o crea una nueva.</p>
        </div>
      ) : (
        <div className="workout-grid">
          {filteredWorkouts.map((workout) => (
            <div key={workout.id} className="workout-card">
              <div className="card-top">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <span className={`badge ${workout.difficulty}`}>
                    {workout.difficulty}
                  </span>
                  <span
                    style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}
                  >
                    {new Date(workout.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="card-title">{workout.title}</h3>
                <p className="card-desc">{workout.description}</p>
              </div>

              <div className="card-actions">
                <Link
                  to={`/workout/${workout.id}`}
                  className="btn-icon"
                  title="Ver detalle"
                >
                  <Eye size={20} />
                </Link>
                <Link
                  to={`/edit-workout/${workout.id}`}
                  className="btn-icon"
                  title="Editar"
                >
                  <Edit size={20} />
                </Link>
                <button
                  onClick={() => handleDelete(workout.id)}
                  className="btn-icon delete"
                  title="Eliminar"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;