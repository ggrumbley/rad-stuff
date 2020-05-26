import React from 'react';
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';
import { formatDistance } from 'date-fns';

import Error from './ErrorMessage';
import { formatMoney } from '../utils';
import * as S from './styles';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    orders(orderBy: createdAt_DESC) {
      id
      total
      createdAt
      items {
        id
        title
        price
        description
        quantity
        image
      }
    }
  }
`;

const OrderList = () => {
  const { data, loading, error } = useQuery(USER_ORDERS_QUERY);

  if (loading) return <p>loading...</p>;
  if (error) return <Error erorr={error} />;

  const { orders } = data;

  return (
    <div>
      <h2>You have {orders.length} orders</h2>
      <S.OrderUL>
        {orders.map((order) => (
          <S.OrderItem key={order.id}>
            <Link
              href={{
                pathname: '/order',
                query: { id: order.id },
              }}
            >
              <a>
                <div className="order-meta">
                  <p>{order.items.reduce((a, b) => a + b.quantity, 0)} Items</p>
                  <p>{order.items.length} Products</p>
                  <p>{formatDistance(new Date(order.createdAt), new Date())}</p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map((item) => (
                    <img key={item.id} src={item.image} alt={item.title} />
                  ))}
                </div>
              </a>
            </Link>
          </S.OrderItem>
        ))}
      </S.OrderUL>
    </div>
  );
};

export default OrderList;
export { USER_ORDERS_QUERY };
