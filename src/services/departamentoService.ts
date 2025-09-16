import api from "./apiJava";

export const buscarDepartamentos = async () => {
    try {
        const response = await api.get('/departamentos');
        return response.data.content;

    }
    catch (error) {
        console.error('Erro ao buscar departamentos:', error);
        throw error;
    }
}