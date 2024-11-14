import inquirer from 'inquirer';
import { getCount, getPostWithComments, getUserPosts } from '../api/placeholderApi';

const menuOptions = [
    { name: 'Obtener cantidad de registros en cada endpoint', value: 'count' },
    { name: 'Obtener comentarios de un post específico', value: 'postComments' },
    { name: 'Obtener posts de un usuario específico', value: 'userPosts' },
    { name: 'Salir', value: 'exit' },
];

export const showMenu = async () => {
    let exit = false;

    while (!exit) {
        const { action } = await inquirer.prompt([
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
                console.log(`/posts: ${await getCount('/posts')}`);
                console.log(`/comments: ${await getCount('/comments')}`);
                console.log(`/albums: ${await getCount('/albums')}`);
                console.log(`/photos: ${await getCount('/photos')}`);
                console.log(`/todos: ${await getCount('/todos')}`);
                console.log(`/users: ${await getCount('/users')}`);
                break;

            case 'postComments':
                const { postId } = await inquirer.prompt([
                    { type: 'input', name: 'postId', message: 'Ingrese el ID del post:' },
                ]);
                const { post, comments } = await getPostWithComments(Number(postId));
                console.log('Post:', post);
                console.log('Comentarios:', comments);
                break;

            case 'userPosts':
                const { userId } = await inquirer.prompt([
                    { type: 'input', name: 'userId', message: 'Ingrese el ID del usuario:' },
                ]);
                const userPosts = await getUserPosts(Number(userId));
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
