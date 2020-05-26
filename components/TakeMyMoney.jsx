import React from 'react';
import Router from 'next/router';
import { gql, useMutation } from '@apollo/client';
import StripeCheckout from 'react-stripe-checkout';
import NProgress from 'nprogress';

import Error from './ErrorMessage';
import { calcTotalPrice, totalItems } from '../utils';
import { TOGGLE_CART_MUTATION } from './Cart';
import { useUser, CURRENT_USER_QUERY } from '../utils';

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

const TakeMyMoney = ({ children }) => {
  const { me, error, loading } = useUser();
  const [createOrder] = useMutation(CREATE_ORDER_MUTATION);
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION);

  const onToken = async (res, createOrder) => {
    NProgress.start();

    toggleCart();

    const order = await createOrder({
      variables: {
        token: res.id,
      },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }).catch((err) => {
      alert(err.message);
    });

    Router.push({
      pathname: '/order',
      query: { id: order.data.createOrder.id },
    });
  };

  if (loading) return null;
  if (error) return <Error error={error} />;

  return (
    <StripeCheckout
      amount={calcTotalPrice(me.cart)}
      name="Rad Stuff"
      description={`Order of ${totalItems(me.cart)} items!`}
      image={me.cart[0]?.item?.image || ''}
      stripeKey={process.env.NEXT_PUBLIC_STRIPE_KEY}
      currency="USD"
      email={me.email}
      token={(res) => onToken(res, createOrder)}
    >
      {children}
    </StripeCheckout>
  );
};

export default TakeMyMoney;
export { CREATE_ORDER_MUTATION };
