import React from 'react';
import { gql, useMutation } from '@apollo/client';

import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from '../utils';

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

const AddToCart = ({ id }) => {
  const [addToCart, { loading, error }] = useMutation(ADD_TO_CART_MUTATION);

  if (error) return <Error error={error} />;

  return (
    <button
      disabled={loading}
      onClick={() =>
        addToCart({
          variables: { id },
          refetchQueries: [{ query: CURRENT_USER_QUERY }],
        })
      }
    >
      Add{loading && 'ing'} to Cart 🛒
    </button>
  );
};

export default AddToCart;
export { ADD_TO_CART_MUTATION };
