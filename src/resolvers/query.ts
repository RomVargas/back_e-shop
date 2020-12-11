import { IResolvers } from "graphql-tools";

/**
 * "Id de usuario"
    id: ID!
    "Nombre de usuario"
    name: String!
    "apellido de Usuario"
    lastname: String!
    "email de usuario"
    email: String!
    "contrasena"
    password: String!
    "Fecha de registro"
    redisterDate: String!
    "Fecha de nacimiento - solo usuarios de 18 anios"
    birthday: String!
 */
const resolversQuery: IResolvers  = {
    Query: {
        users(root, args, context, info) {
            console.log(root);
            console.log(args);
            console.log(context);
            console.log(info);
            return [
                {
                    id: 1,
                    name: 'Roman',
                    lastname: 'Vargas',
                    email: 'romvargas81@gmail.com',
                    password: '',
                    registerDate: '',
                    birthday: ''
                }
            ];
        }
    }
};

export default resolversQuery;