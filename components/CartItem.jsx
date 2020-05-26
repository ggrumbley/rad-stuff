import React from 'react';

import RemoveFromCart from './RemoveFromCart';
import { formatMoney } from '../utils';

import * as S from './styles';

const CartItem = ({ cartItem }) =>
  !cartItem.item ? (
    <S.CartItem>
      <p>This Item has been removed</p>
      <RemoveFromCart id={cartItem.id} />
    </S.CartItem>
  ) : (
    <S.CartItem>
      <img width="100" src={cartItem.item.image} alt={cartItem.item.title} />
      <div className="cart-item-details">
        <h3>{cartItem.item.title}</h3>
        <p>
          {formatMoney(cartItem.item.price * cartItem.quantity)}
          {' - '}
          <em>
            {cartItem.quantity} &times; {formatMoney(cartItem.item.price)} each
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </S.CartItem>
  );

export default CartItem;
