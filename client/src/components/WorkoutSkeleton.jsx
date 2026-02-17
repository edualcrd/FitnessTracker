import React from 'react';

const WorkoutSkeleton = () => {
  return (
    <div className="workout-card" style={{ border: 'none', pointerEvents: 'none' }}>
      {/* Título Fantasma */}
      <div className="skeleton skeleton-title" style={{ width: '40%' }}></div>
      
      {/* Descripción Fantasma */}
      <div className="skeleton skeleton-text" style={{ height: '20px', width: '90%', marginBottom: '0.5rem' }}></div>
      <div className="skeleton skeleton-text" style={{ height: '20px', width: '70%', marginBottom: '1.5rem' }}></div>
      
      {/* Botones Fantasma (Círculos) */}
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <div className="skeleton" style={{ width: '32px', height: '32px', borderRadius: '50%' }}></div>
        <div className="skeleton" style={{ width: '32px', height: '32px', borderRadius: '50%' }}></div>
        <div className="skeleton" style={{ width: '32px', height: '32px', borderRadius: '50%' }}></div>
      </div>
    </div>
  );
};

export default WorkoutSkeleton;