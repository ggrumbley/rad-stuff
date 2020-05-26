import React from 'react';
import { useMutation, gql } from '@apollo/client';

import Error from './ErrorMessage';
import { ALL_ITEMS_QUERY } from './Items';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

const DeleteItem = ({ children, id }) => {
  const [deleteItem, { error }] = useMutation(DELETE_ITEM_MUTATION, {
    update(cache, { data: { deleteItem } }) {
      const { items } = cache.readQuery({ query: ALL_ITEMS_QUERY });

      cache.writeQuery({
        query: ALL_ITEMS_QUERY,
        data: {
          items: items.filter((item) => item.id !== deleteItem.id),
        },
      });
    },
  });

  if (error) return <Error error={error} />;

  return (
    <button
      onClick={() => {
        if (confirm('Are you sure you want to delete this item?')) {
          deleteItem({ variables: { id } });
        }
      }}
    >
      {children}
    </button>
  );
};

export default DeleteItem;
export { DELETE_ITEM_MUTATION };
