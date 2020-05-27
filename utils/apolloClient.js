import { ApolloClient, HttpLink, gql, InMemoryCache } from '@apollo/client';

export const GET_LOCAL_STATE = gql`
  query GetLocalState {
    isCartOpen @client
  }
`;

const cache = new InMemoryCache();

cache.writeQuery({
  query: GET_LOCAL_STATE,
  data: {
    isCartOpen: false,
  },
});

export const createApolloClient = (initialState, ctx) => {
  const link = new HttpLink({
    uri: 'http://localhost:4444',
    credentials: 'include',
  });

  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link,
    cache: cache.restore(initialState),
    resolvers: {
      Mutation: {
        toggleCart: (_root, variables, { cache }) => {
          const { isCartOpen } = cache.readQuery({
            query: GET_LOCAL_STATE,
          });
          const data = {
            isCartOpen: !isCartOpen,
          };

          cache.writeQuery({ query: GET_LOCAL_STATE, data });
          return null;
        },
      },
    },
  });
};
