import React from 'react';
import { useRouter } from 'next/router';

import SingleItem from '../components/SingleItem';

const Item = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <SingleItem id={id} />
    </div>
  );
};

export default Item;
