import React from 'react';

import Signin from './Signin';

import { useUser } from '../utils';

const AuthGuard = ({ children }) => {
  const { me, loading, error } = useUser();

  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;

  if (!me) {
    return (
      <div>
        <p>Please Sign In before Continuing</p>
        <Signin />
      </div>
    );
  }

  return children;
};

export default AuthGuard;
