import React from 'react';
import Link from 'next/link';

import DeleteItem from './DeleteItem';
import AddToCart from './AddToCart';
import { formatMoney } from '../utils';

import * as S from './styles';

const Item = ({ item }) => {
  return (
    <S.Item>
      {item.image && <img src={item.image} alt={item.title} />}
      <S.Title>
        <Link
          href={{
            pathname: '/item',
            query: { id: item.id },
          }}
        >
          <a>{item.title}</a>
        </Link>
      </S.Title>
      <S.PriceTag>{formatMoney(item.price)}</S.PriceTag>
      <p>{item.description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: 'update',
            query: { id: item.id },
          }}
        >
          <a>Edit 📝</a>
        </Link>
        <AddToCart id={item.id} />
        <DeleteItem id={item.id}>Delete Item</DeleteItem>
      </div>
    </S.Item>
  );
};

export default Item;
