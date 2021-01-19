import { IResolvers } from 'graphql-tools';
import { COLLECTIONS } from '../config/constants';

const queries: IResolvers  = {
    Query: {
        async users(_, __, { db }) {
            console.log('7');
            let users
            try {
                users = await db.collection(COLLECTIONS.USERS).
                    find().toArray();
                
            } catch (error) {
                console.error(error);
                return [];
            }
            return users;
        }
    }
};

export default queries;