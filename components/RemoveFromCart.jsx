import React from 'react';
import { useMutation, gql } from '@apollo/client';

import Error from './ErrorMessage';

import { CURRENT_USER_QUERY } from '../utils';

import * as S from './styles';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const RemoveFromCart = ({ id }) => {
  const [removeFromCart, { loading, error }] = useMutation(
    REMOVE_FROM_CART_MUTATION,
    {
      update(cache, { data: { removeFromCart } }) {
        const { me } = cache.readQuery({ query: CURRENT_USER_QUERY });
        cache.writeQuery({
          query: CURRENT_USER_QUERY,
          data: {
            me: {
              cart: me.cart.filter((item) => item.id !== removeFromCart.id),
            },
          },
        });
      },
    }
  );

  if (error) return <Error error={error} />;

  return (
    <S.BigButton
      disabled={loading}
      onClick={() => {
        removeFromCart({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            removeFromCart: {
              __typename: 'CartItem',
              id,
            },
          },
        }).catch((err) => alert(err.message));
      }}
      title="Delete Item"
    >
      &times;
    </S.BigButton>
  );
};

export default RemoveFromCart;
export { REMOVE_FROM_CART_MUTATION };
