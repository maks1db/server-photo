const typeDefs = require('./types.gql');
const resolvers = require('./resolvers');
const { makeExecutableSchema } = require('graphql-tools');

module.exports = makeExecutableSchema({
    typeDefs,
    resolvers
});
