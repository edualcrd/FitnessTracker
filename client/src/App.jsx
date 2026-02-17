import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

// Componentes
import Navbar from './components/Navbar';

// Páginas
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CreateWorkoutPage from './pages/CreateWorkoutPage';
import WorkoutDetailPage from './pages/WorkoutDetailPage';
import EditWorkoutPage from './pages/EditWorkoutPage';
// Protección de rutas
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Cargando...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="app-container">
      <Toaster position="top-center" />
      
      {/* Usamos el componente Navbar aquí */}
      <Navbar /> 
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Rutas Privadas */}
          <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/create-workout" element={<PrivateRoute><CreateWorkoutPage /></PrivateRoute>} />
          <Route path="/workout/:id" element={<PrivateRoute><WorkoutDetailPage /></PrivateRoute>} />
          <Route path="/edit-workout/:id" element={<PrivateRoute><EditWorkoutPage /></PrivateRoute>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;