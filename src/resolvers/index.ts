import  queries  from "./query";
import { IResolvers } from "graphql-tools";
import mutation from './mutation';

const resolvers: IResolvers  = {
    ...queries,
    ...mutation
};

export default resolvers;
