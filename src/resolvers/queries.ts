import { IResolvers } from 'graphql-tools';
import { COLLECTIONS, EXPIRETIME, MESSAGES } from '../config/constants';
import JWT from '../lib/jwt';
import bcrypt from 'bcrypt';

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
                const user = await db.collection(COLLECTIONS.USERS).findOne({email})
                if(user === null){
                    return {
                        status: false,
                        message: "No se encontroe el usuario, favor de verificar",
                        token: null
                    }
                } 
                const passwordCheck = bcrypt.compareSync(password, user.password);
                if(passwordCheck !== null){
                    delete user.password;
                    delete user.birthday;
                    delete user.registerDate;
                }
                return {
                    status: true,
                    message:
                        !passwordCheck
                        ? 'credenciales incorrectas, favor de verificar'
                        :  'Se encontro Usuario, login satisfactorio',
                    token:
                        !passwordCheck
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
        },
        me(_, __, { token }){
            console.log(token);
            let info = new JWT().verify(token);
            if(info === MESSAGES.TOKEN_VERIFICATION_FALIED){
                return {
                    status: false,
                    message: info,
                    user: null
                };
            }
            return {
                status: true,
                message: 'Usuario verificado correctamente mediante token',
                user: Object.values(info)[0]
            };
        }
    },
};

export default queries;