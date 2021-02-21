import { IResolvers } from "graphql-tools";
import { COLLECTIONS } from "../config/constants";
import bcrypt from 'bcrypt';

const resolversMutation: IResolvers  = {
    Mutation: {
        async register(_, { user }, { db }) {
            // Comporbar que el usuario no exite
            const userCheck = await db.collection(COLLECTIONS.USERS).findOne({email: user.email});

            if(userCheck !== null){
                return {
                    status: false,
                    message: `El email ${user.email} ya se encuentra registrado`,
                    user:null
                }
            }

            // Comporbar el ultimo usuario registardo para asignar ID
            const lastUser = await db.collection(COLLECTIONS.USERS).
                                find().
                                limit(1).
                                sort({registerDate: -1}).toArray();
            console.log(lastUser)
            if (lastUser === 0 || lastUser === []) {
                user.id = 1;
            }else {
                user.id = lastUser[0].id + 1;
            }
            // Asignar la fecha en formato ISO en la propiedead register date
            user.registerDate = new Date().toISOString();
            // Encriptar password
            user.password = bcrypt.hashSync(user.password, 12);

            //Gusrdar el documento (registro) en la coleccion
            return await db.
                collection(COLLECTIONS.USERS).
                insertOne(user).then(
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

export default resolversMutation;
