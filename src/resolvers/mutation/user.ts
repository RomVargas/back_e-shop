import { IResolvers } from "graphql-tools";
import { COLLECTIONS } from "../../config/constants";
//import bcrypt from 'bcrypt';
import bcrypt from 'bcryptjs';
import { asignDocumentId, findOneElement, insertOneElement } from "../../lib/db-operation";

const resolversUserMutation: IResolvers  = {
    Mutation: {
        async register(_, { user }, { db }) {
            // Comporbar que el usuario no exite
            const userCheck = await findOneElement(db, COLLECTIONS.USERS , {email: user.email});

            if(userCheck !== null){
                return {
                    status: false,
                    message: `El email ${user.email} ya se encuentra registrado`,
                    user:null
                }
            }

            user.id = await asignDocumentId(db, COLLECTIONS.USERS);
            // Asignar la fecha en formato ISO en la propiedead register date
            user.registerDate = new Date().toISOString();
            // Encriptar password
            user.password = bcrypt.hashSync(user.password, 12);
            //Gusrdar el documento (registro) en la coleccion
            return await insertOneElement(db, COLLECTIONS.USERS, user) 
                    .then(
                    async () => {
                        return {
                            status: true,
                            message:`El email ${user.email} se ha registrado`,
                            user
                        };
                    }
                ).catch((err: Error) => {
                    console.log(err.message);
                    return null;
                })
        }
    }
};

export default resolversUserMutation;