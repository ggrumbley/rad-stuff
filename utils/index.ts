import * as T from '../models';

export const calcTotalPrice = (cart: T.CartItem[]) =>
  cart.reduce((tally: number, cartItem: T.CartItem) => {
    if (!cartItem.item) return tally;
    return tally + cartItem.quantity * cartItem.item.price;
  }, 0);

export const formatMoney = (amount: number) => {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };
  // if its a whole, dollar amount, leave off the .00
  if (amount % 100 === 0) options.minimumFractionDigits = 0;
  const formatter = new Intl.NumberFormat('en-US', options);
  return formatter.format(amount / 100);
};

export const totalItems = (cart: T.CartItem[]) =>
  cart.reduce(
    (tally: number, cartItem: T.CartItem) => tally + cartItem.quantity,
    0
  );

export { useUser, CURRENT_USER_QUERY } from './useUser';
export { GET_LOCAL_STATE } from './apolloClient';
export { withApolloClient } from './withApolloClient';
