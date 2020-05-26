import { gql, useQuery } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
      cart {
        id
        quantity
        item {
          id
          price
          image
          title
          description
        }
      }
    }
  }
`;

export const useUser = () => {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);

  return { me: data?.me, loading, error };
};
