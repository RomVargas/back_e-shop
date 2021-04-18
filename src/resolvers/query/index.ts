import resolversProductQueries from "./product";
import resolversUserQueries from "./users";

const GMR = require('@wiicamp/graphql-merge-resolvers');

const queryResolvers = GMR.merge([
    resolversUserQueries,
    resolversProductQueries
]);

export default queryResolvers;