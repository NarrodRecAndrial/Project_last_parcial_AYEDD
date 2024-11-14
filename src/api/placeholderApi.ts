import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Funciones para obtener la cantidad de registros en cada endpoint
export const getCount = async (endpoint: string): Promise<number> => {
    try {
        const response = await axios.get(`${BASE_URL}${endpoint}`);
        return response.data.length;
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        return 0;
    }
};

// Obtener un post aleatorio y sus comentarios
export const getPostWithComments = async (postId: number) => {
    const post = await axios.get(`${BASE_URL}/posts/${postId}`);
    const comments = await axios.get(`${BASE_URL}/posts/${postId}/comments`);
    return { post: post.data, comments: comments.data };
};

// Obtener posts de un usuario
export const getUserPosts = async (userId: number) => {
    const response = await axios.get(`${BASE_URL}/users/${userId}/posts`);
    return response.data;
};
