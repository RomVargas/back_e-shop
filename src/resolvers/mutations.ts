import { IResolvers } from "graphql-tools";
import { COLLECTIONS } from "../config/constants";

const resolversMutation: IResolvers  = {
    Mutation: {
        async register(_, { user }, { db }) {
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

            //Gusrdar el documento (registro) en la coleccion
            return await db.
                collection(COLLECTIONS.USERS).
                insertOne(user).then(
                    async () => {
                        return user;
                    }
                ).catch((err: Error) => {
                    console.log(err.message);
                    return null;
                })
        }
    }
};

export default resolversMutation;
