import React from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/client';

import Signout from './Signout';
import CartCount from './CartCount';
import Error from './ErrorMessage';
import { TOGGLE_CART_MUTATION } from './Cart';
import { totalItems } from '../utils';
import { useUser } from '../utils';

import * as S from './styles';

const Nav = () => {
  const { me, loading, error } = useUser();
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION);

  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;

  return (
    <S.Nav data-test="nav">
      <Link href="/items">
        <a>Shop</a>
      </Link>
      {me && (
        <>
          <Link href="/sell">
            <a>Sell</a>
          </Link>

          <Link href="/order">
            <a>Orders</a>
          </Link>
          <Link href="/admin">
            <a>Admin</a>
          </Link>
          <Signout />
          <button onClick={toggleCart}>
            My Cart
            <CartCount count={totalItems(me.cart)} />
          </button>
        </>
      )}
      {!me && (
        <Link href="/signup">
          <a>Sign In</a>
        </Link>
      )}
    </S.Nav>
  );
};

export default Nav;
