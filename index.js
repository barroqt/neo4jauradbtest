const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer, gql } = require("apollo-server");
const neo4j = require("neo4j-driver");

const typeDefs = gql`
    type Movie {
        title: String
    }
`;

const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic("neo4j", process.env.NEO4J_PASSWORD)
);

const neoSchema = new Neo4jGraphQL({typeDefs, driver});

const server = new ApolloServer({
    schema: neoSchema.schema,
})

server.listen().then((url) => {
    console.log(`GraphQL server ready at ${url}`);
})