import api from "./api";

const workoutService = {
  getAll: async (filter = "") => {
    // Si hay filtro de dificultad, lo enviamos como query param
    const url = filter ? `/workouts?difficulty=${filter}` : "/workouts";
    const response = await api.get(url);
    return response.data;
  },

  create: async (workoutData) => {
    const response = await api.post("/workouts", workoutData);
    return response.data;
  },
  
  update: async (id, workoutData) => {
    const response = await api.put(`/workouts/${id}`, workoutData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/workouts/${id}`);
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/workouts/${id}`);
    return response.data;
  },

  addExercise: async (workoutId, exerciseData) => {
    const response = await api.post(
      `/workouts/${workoutId}/exercises`,
      exerciseData,
    );
    return response.data;
  },
};

export default workoutService;
