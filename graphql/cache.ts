import { gql, InMemoryCache } from '@apollo/client';

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

export { cache };
