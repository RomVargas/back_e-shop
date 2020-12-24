import { query } from "express";
import { IResolvers } from "graphql-tools";
import mutation from './mutation';

const resolvers: IResolvers  = {
    ...query,
    ...mutation
};

export default resolvers;
