import React from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend 
} from 'recharts';

const COLORS = ['#4ade80', '#facc15', '#f87171']; // Verde, Amarillo, Rojo

const StatsCharts = ({ workouts }) => {
  // 1. Preparar datos para el gráfico circular (Pie)
  const difficultyData = [
    { name: 'Easy', value: workouts.filter(w => w.difficulty === 'Easy').length },
    { name: 'Medium', value: workouts.filter(w => w.difficulty === 'Medium').length },
    { name: 'Hard', value: workouts.filter(w => w.difficulty === 'Hard').length },
  ].filter(item => item.value > 0); // Solo mostramos los que tienen datos

  // 2. Preparar datos para gráfico de barras (Ej: Cantidad por dificultad comparativa)
  // En una app real, aquí agruparíamos por fecha (created_at)
  const barData = [
    {
      name: 'Intensidad',
      Easy: workouts.filter(w => w.difficulty === 'Easy').length,
      Medium: workouts.filter(w => w.difficulty === 'Medium').length,
      Hard: workouts.filter(w => w.difficulty === 'Hard').length,
    }
  ];

  if (workouts.length === 0) return null;

  return (
    <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
      
      {/* Gráfico 1: Distribución Circular */}
      <div className="card" style={{ padding: '1.5rem', border: '1px solid #333', height: '300px' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Distribución de Dificultad</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={difficultyData}
              cx="50%"
              cy="50%"
              innerRadius={60} // Hace que sea un Donut
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {difficultyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <RechartsTooltip 
              contentStyle={{ backgroundColor: '#1e1e1e', border: 'none', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico 2: Barras de Volumen */}
      <div className="card" style={{ padding: '1.5rem', border: '1px solid #333', height: '300px' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Volumen de Entrenamientos</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <RechartsTooltip 
              contentStyle={{ backgroundColor: '#1e1e1e', border: 'none', borderRadius: '8px' }}
              cursor={{fill: 'transparent'}}
            />
            <Legend />
            <Bar dataKey="Easy" fill="#4ade80" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Medium" fill="#facc15" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Hard" fill="#f87171" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsCharts;