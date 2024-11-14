"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showMenu = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const placeholderApi_1 = require("../api/placeholderApi");
const menuOptions = [
    { name: 'Obtener cantidad de registros en cada endpoint', value: 'count' },
    { name: 'Obtener comentarios de un post específico', value: 'postComments' },
    { name: 'Obtener posts de un usuario específico', value: 'userPosts' },
    { name: 'Salir', value: 'exit' },
];
const showMenu = async () => {
    let exit = false;
    while (!exit) {
        const { action } = await inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Seleccione una opción:',
                choices: menuOptions,
            },
        ]);
        switch (action) {
            case 'count':
                console.log('Cantidad de registros:');
                console.log(`/posts: ${await (0, placeholderApi_1.getCount)('/posts')}`);
                console.log(`/comments: ${await (0, placeholderApi_1.getCount)('/comments')}`);
                console.log(`/albums: ${await (0, placeholderApi_1.getCount)('/albums')}`);
                console.log(`/photos: ${await (0, placeholderApi_1.getCount)('/photos')}`);
                console.log(`/todos: ${await (0, placeholderApi_1.getCount)('/todos')}`);
                console.log(`/users: ${await (0, placeholderApi_1.getCount)('/users')}`);
                break;
            case 'postComments':
                const { postId } = await inquirer_1.default.prompt([
                    { type: 'input', name: 'postId', message: 'Ingrese el ID del post:' },
                ]);
                const { post, comments } = await (0, placeholderApi_1.getPostWithComments)(Number(postId));
                console.log('Post:', post);
                console.log('Comentarios:', comments);
                break;
            case 'userPosts':
                const { userId } = await inquirer_1.default.prompt([
                    { type: 'input', name: 'userId', message: 'Ingrese el ID del usuario:' },
                ]);
                const userPosts = await (0, placeholderApi_1.getUserPosts)(Number(userId));
                console.log('Posts del usuario:', userPosts);
                break;
            case 'exit':
                exit = true;
                console.log('Saliendo...');
                break;
            default:
                console.log('Opción no válida.');
                break;
        }
    }
};
exports.showMenu = showMenu;
