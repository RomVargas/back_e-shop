import { IResolvers } from 'graphql-tools';
import { COLLECTIONS, EXPIRETIME } from '../config/constants';
import JWT from '../lib/jwt';

const queries: IResolvers  = {
    Query: {
        async users(_, __, { db }) {
            try {
                return {
                    status: true,
                    message: "Lista de usuarios cargados correctamente",
                    users: await db.collection(COLLECTIONS.USERS).find().toArray()
                };
                
            } catch (error) {
                console.error(error);
                return {
                    status: false,
                    message: "No fue posible obtener lista de usuarios",
                    users: []
                };
            }

        },
        async login(_,{ email, password }, { db } ) {
            try {
                const emailVerification = await db.collection(COLLECTIONS.USERS).findOne({email})
                if(emailVerification === null){
                    return {
                        status: false,
                        message: "No se encontroe el usuario, favor de verificar",
                        token: null
                    }
                } 
                const user = await db.collection(COLLECTIONS.USERS).findOne({email, password})
                if(user !== null){
                    delete user.password;
                    delete user.birthday;
                    delete user.registerDate;
                }
                return {
                    status: true,
                    message:
                        user === null
                        ? 'credenciales incorrectas, favor de verificar'
                        :  'Se encontro Usuario, login satisfactorio',
                    token:
                        user === null 
                        ? null 
                        : new JWT().sign({ user }, EXPIRETIME.H24) 
                };
            } catch (error) {
                return {
                    status: false,
                    message: "Error en login" + error,
                    user: [],
                    token: null
                }
            }
        }
    }
};

export default queries;