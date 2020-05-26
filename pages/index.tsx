import React from 'react';
import { useRouter } from 'next/router';

import Items from '../components/Items';

const Home = () => {
  const router = useRouter();
  const { page } = router.query;

  return (
    <div>
      <Items page={Number(page) || 1} />
    </div>
  );
};

export default Home;
