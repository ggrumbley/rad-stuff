import React from 'react';
import Head from 'next/head';
import { gql, useQuery } from '@apollo/client';

import Error from './ErrorMessage';
import * as S from './styles';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      largeImage
    }
  }
`;

const SingleItem = ({ id }) => {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });

  if (error) return <Error error={error} />;
  if (loading) return <p>Loading...</p>;
  if (!data.item) return <p>No Item Found for {id}</p>;

  const { title, largeImage, description } = data.item;

  return (
    <S.SingleItem>
      <Head>
        <title>Sick Fits | {title}</title>
      </Head>
      <img src={largeImage} alt={title} />
      <div className="details">
        <h2>Viewing {title}</h2>
        <p>{description}</p>
      </div>
    </S.SingleItem>
  );
};

export default SingleItem;
export { SINGLE_ITEM_QUERY };
