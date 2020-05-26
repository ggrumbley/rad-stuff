import styled, { createGlobalStyle } from 'styled-components';

export const theme = {
  red: '#FF3864',
  black: '#0D0221',
  grey: '#261447',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
  breakpoints: {
    XL: '1300px',
  },
};

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'radnika_next';
    src: url('/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'radnika_next';
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
  button {  font-family: 'radnika_next'; }
`;

export const ItemsContainer = styled.div`
  text-align: center;
`;

export const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
`;

export const PreviewImage = styled.img`
  object-fit: cover;
  width: auto;
  height: 200px;
`;

export const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

export const CartItem = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${(props) => props.theme.lightgrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 10px;
  }
  h3,
  p {
    margin: 0;
  }
`;

export const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${(props) => props.theme.red};
    cursor: pointer;
  }
`;

export const SingleItem = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${(props) => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

export { default as Cart } from './Cart.styled';
export { Dot, CountAnimation } from './CartCount.styled';
export { default as CloseButton } from './CloseButton.styled';
export { DropDown, DropDownItem, Search } from './DropDown.styled';
export { default as Form } from './Form.styled';
export { Logo, Bar, SubBar } from './Header.styled';
export { default as Item } from './Item.styled';
export { Inner, Page } from './Layout.styled';
export { default as Nav } from './Nav.styled';
export { default as Order } from './Order.styled';
export { OrderItem, OrderUL } from './OrderItem.styled';
export { default as Pagination } from './Pagination.styled';
export { default as PriceTag } from './PriceTag.styled';
export { default as SickButton } from './SickButton.styled';
export { default as Supreme } from './Supreme.styled';
export { default as Table } from './Table.styled';
export { default as Title } from './Title.styled';
