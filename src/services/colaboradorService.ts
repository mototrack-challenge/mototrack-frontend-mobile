import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5073/api",
});

export const buscarColaboradores = async () => {
  try {
    const response = await api.get("/Colaborador", {
      params: { deslocamento: 0, registrosRetornados: 1000 },
    });
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar colaboradores:", error);
    throw error;
  }
};