import React from 'react';
import { gql, useMutation } from '@apollo/client';

import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from '../utils';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const Signout = () => {
  const [signout, { loading, error }] = useMutation(SIGN_OUT_MUTATION);

  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;

  return (
    <button
      onClick={() =>
        signout({ refetchQueries: [{ query: CURRENT_USER_QUERY }] })
      }
    >
      Sign Out
    </button>
  );
};

export default Signout;
export { SIGN_OUT_MUTATION };
