import  queries  from "./queries";
import { IResolvers } from "graphql-tools";
import mutation from './mutations';

const resolvers: IResolvers  = {
    ...queries,
    ...mutation
};

export default resolvers;
