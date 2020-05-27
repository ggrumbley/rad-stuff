import { ApolloServer, gql } from 'apollo-server-micro';
// import { schema } from '../../server/schema';

const typeDefs = gql`
  type Query {
    users: [User!]!
  }
  type User {
    name: String
  }
`;

const resolvers = {
  Query: {
    users(parent, args, context) {
      return [{ name: 'Nextjs' }];
    },
  },
};

const apolloServer = new ApolloServer({
  resolvers,
  typeDefs,
  context(ctx) {
    return ctx;
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
