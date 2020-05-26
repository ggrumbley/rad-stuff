import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';

import Nav from './Nav';
import Cart from './Cart';
import Search from './Search';
import * as S from './styles';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Header = () => (
  <header>
    <S.Bar>
      <S.Logo>
        <Link href="/">
          <a href="">Rad Stuff</a>
        </Link>
      </S.Logo>
      <Nav />
    </S.Bar>
    <S.SubBar>
      <Search />
    </S.SubBar>
    <Cart />
  </header>
);

export default Header;
