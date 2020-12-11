import { query } from "express";
import { IResolvers } from "graphql-tools";

const resolvers: IResolvers  = {
    ...query
};

export default resolvers;
