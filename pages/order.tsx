import React from 'react';
import { useRouter } from 'next/router';

import AuthGuard from '../components/AuthGuard';
import Order from '../components/Order';
import OrderList from '../components/OrderList';

const OrderPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <AuthGuard>{id ? <Order id={id} /> : <OrderList />}</AuthGuard>
    </div>
  );
};

export default OrderPage;
