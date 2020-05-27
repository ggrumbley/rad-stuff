import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

import CartItem from './CartItem';
import TakeMyMoney from './TakeMyMoney';
import { useUser } from '../utils';
import { formatMoney, calcTotalPrice } from '../utils';
import { GET_LOCAL_STATE } from '../utils';
import * as S from './styles';

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

const Cart = () => {
  const { me } = useUser();
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION);
  const { data } = useQuery(GET_LOCAL_STATE);

  if (!me) return null;

  return (
    <S.Cart open={data.isCartOpen}>
      <header>
        <S.CloseButton onClick={toggleCart} title="close">
          &times;
        </S.CloseButton>
        <S.Supreme>{me.name}'s Cart</S.Supreme>
        <p>
          You Have {me.cart.length} Item{me.cart.length === 1 ? '' : 's'} in
          your cart.
        </p>
      </header>
      <ul>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
        <TakeMyMoney>
          <S.SickButton>Checkout</S.SickButton>
        </TakeMyMoney>
      </footer>
    </S.Cart>
  );
};

export default Cart;
export { TOGGLE_CART_MUTATION };
