import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import * as S from './styles';

const CartCount = ({ count }) => (
  <S.CountAnimation>
    <TransitionGroup>
      <CSSTransition
        unmountOnExit
        className="count"
        classNames="count"
        key={count}
        timeout={{ enter: 400, exit: 400 }}
      >
        <S.Dot>{count}</S.Dot>
      </CSSTransition>
    </TransitionGroup>
  </S.CountAnimation>
);

export default CartCount;
