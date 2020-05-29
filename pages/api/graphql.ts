// import { ApolloServer, gql } from 'apollo-server-micro';
import { graphql } from 'graphql';
import { GraphQLDate } from 'graphql-iso-date';
import { asNexusMethod } from '@nexus/schema';

import { schema } from '../../server';

// const typeDefs = gql`
//   type Query {
//     users: [User!]!
//   }
//   type User {
//     name: String
//   }
// `;

// const resolvers = {
//   Query: {
//     users(parent, args, context) {
//       return [{ name: 'Nextjs' }];
//     },
//   },
// };

// const apolloServer = new ApolloServer({
//   schema,
//   context(ctx) {
//     return ctx;
//   },
// });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default apolloServer.createHandler({ path: '/api/graphql' });

export const GQLDate = asNexusMethod(GraphQLDate, 'date');

export default async (req, res) => {
  const query = req.body.query;
  const variables = req.body.variables;
  const response = await graphql(schema, query, {}, {}, variables);
  return res.end(JSON.stringify(response));
};
