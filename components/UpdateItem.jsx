import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

import Error from './ErrorMessage';
import { formatMoney } from '../utils';

import * as S from './styles';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

const UpdateItem = ({ id }) => {
  const [itemState, setItemState] = useState({});

  const { data, loading: queryLoading } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });

  const [
    updateItem,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(UPDATE_ITEM_MUTATION);

  const handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    setItemState({ ...itemState, [name]: val });
  };

  const handleUpdate = async (e, updateItemMutation) => {
    e.preventDefault();

    const res = await updateItemMutation({
      variables: {
        id,
        title: itemState.title,
        description: itemState.description,
        price: itemState.price,
      },
    });
  };

  if (queryLoading) return <p>Loading...</p>;
  if (!data.item) return <p>No Item Found for ID {id}</p>;

  return (
    <S.Form onSubmit={(e) => handleUpdate(e, updateItem)}>
      <Error error={mutationError} />
      <fieldset disabled={mutationLoading} aria-busy={mutationLoading}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          defaultValue={data.item.title}
          onChange={(e) => handleChange(e)}
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Price"
          defaultValue={data.item.price}
          onChange={(e) => handleChange(e)}
        />

        <label htmlFor="description">Description</label>
        <textarea
          type="number"
          id="description"
          name="description"
          placeholder="Enter A Description"
          defaultValue={data.item.description}
          onChange={(e) => handleChange(e)}
        />

        <button type="submit">
          Sav{mutationLoading ? 'ing' : 'e'} Changes
        </button>
      </fieldset>
    </S.Form>
  );
};

export default UpdateItem;
export { UPDATE_ITEM_MUTATION, SINGLE_ITEM_QUERY };
