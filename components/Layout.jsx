import React from 'react';

import Header from './Header';
import Meta from './Meta';

import * as S from './styles';

const Layout = ({ children }) => (
  <S.Page>
    <Meta />
    <Header />
    <S.Inner>{children}</S.Inner>
  </S.Page>
);

export default Layout;
