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

            // Asignar la fecha en formato ISO en la propiedead register date


            //Gusrdar el documento (registro) en la coleccion
        }
    }
};

export default resolversMutation;
