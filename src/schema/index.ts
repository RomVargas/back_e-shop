import 'graphql-import-node';
import resolvers from '../resolvers';
import { makeExecutableSchema } from "graphql-tools";
import { GraphQLSchema } from "graphql";

const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs } = require('@graphql-tools/merge');

const loadedFiles = loadFilesSync(`${__dirname}schema/**/*.graphql`);
const typeDefs = mergeTypeDefs(loadFilesSync, { all: true }); 

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: {
        requireResolversForResolveType: 'ignore'
    }
});

export default schema;
