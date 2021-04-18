import { IResolvers } from 'graphql-tools';

const resolversProductQueries: IResolvers  = {
    Query: {
        products(){
            return true;
        }
    },
};

export default resolversProductQueries;