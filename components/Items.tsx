import React, { FunctionComponent } from 'react';
import { useQuery, gql } from '@apollo/client';

import Item from './Item';
import Pagination from './Pagination';
import Error from './ErrorMessage';
import { perPage } from '../config';

import * as S from './styles';

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

export interface ItemsProps {
  page: number;
}

const Items: FunctionComponent<ItemsProps> = ({ page }) => {
  const { data, loading, error } = useQuery(ALL_ITEMS_QUERY, {
    variables: { skip: page * perPage - perPage },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;

  return (
    <S.ItemsContainer>
      <Pagination page={page} />
      <S.ItemsList>
        {data.items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </S.ItemsList>
      <Pagination page={page} />
    </S.ItemsContainer>
  );
};

export default Items;
export { ALL_ITEMS_QUERY };
