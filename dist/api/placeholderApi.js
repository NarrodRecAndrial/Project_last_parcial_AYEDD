"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPosts = exports.getPostWithComments = exports.getCount = void 0;
const axios_1 = __importDefault(require("axios"));
const BASE_URL = 'https://jsonplaceholder.typicode.com';
// Funciones para obtener la cantidad de registros en cada endpoint
const getCount = async (endpoint) => {
    try {
        const response = await axios_1.default.get(`${BASE_URL}${endpoint}`);
        return response.data.length;
    }
    catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        return 0;
    }
};
exports.getCount = getCount;
// Obtener un post aleatorio y sus comentarios
const getPostWithComments = async (postId) => {
    const post = await axios_1.default.get(`${BASE_URL}/posts/${postId}`);
    const comments = await axios_1.default.get(`${BASE_URL}/posts/${postId}/comments`);
    return { post: post.data, comments: comments.data };
};
exports.getPostWithComments = getPostWithComments;
// Obtener posts de un usuario
const getUserPosts = async (userId) => {
    const response = await axios_1.default.get(`${BASE_URL}/users/${userId}/posts`);
    return response.data;
};
exports.getUserPosts = getUserPosts;
