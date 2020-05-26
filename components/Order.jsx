import React from 'react';
import Head from 'next/head';
import { gql, useQuery } from '@apollo/client';
import { format } from 'date-fns';

import Error from './ErrorMessage';
import { formatMoney } from '../utils';

import * as S from './styles';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      createdAt
      user {
        id
      }
      items {
        id
        title
        description
        price
        image
        quantity
      }
    }
  }
`;

const Order = ({ id }) => {
  const { data, loading, error } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id },
  });

  if (error) return <Error error={error} />;
  if (loading) return <p>Loading...</p>;

  const {
    order: { charge, createdAt, total, items },
  } = data;

  return (
    <S.Order data-test="order">
      <Head>
        <title>Rad Stuff - Order {id}</title>
      </Head>
      <p>
        <span>Order ID:</span>
        <span>{id}</span>
      </p>
      <p>
        <span>Charge</span>
        <span>{charge}</span>
      </p>
      <p>
        <span>Date</span>
        <span>
          {format(new Date(createdAt), 'MMMM d, yyyy h:mm a', {
            awareOfUnicodeTokens: true,
          })}
        </span>
      </p>
      <p>
        <span>Order Total</span>
        <span>{formatMoney(total)}</span>
      </p>
      <p>
        <span>Item Count</span>
        <span>{items.length}</span>
      </p>
      <div className="items">
        {items.map((item) => (
          <div className="order-item" key={item.id}>
            <img src={item.image} alt={item.title} />
            <div className="item-details">
              <h2>{item.title}</h2>
              <p>Qty: {item.quantity}</p>
              <p>Each: {formatMoney(item.price)}</p>
              <p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </S.Order>
  );
};

export default Order;
export { SINGLE_ORDER_QUERY };
