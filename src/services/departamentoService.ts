import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

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