import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

import Error from './ErrorMessage';

import * as S from './styles';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

const RequestReset = () => {
  const [email, setEmail] = useState('');
  const [reset, { loading, error, called }] = useMutation(
    REQUEST_RESET_MUTATION
  );

  return (
    <S.Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        await reset({ variables: { email } });
        setEmail('');
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Reset Password</h2>
        <Error error={error} />
        {!error && !loading && called && (
          <p>Success! Check your email for a reset link!</p>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button type="submit">Request Reset</button>
      </fieldset>
    </S.Form>
  );
};

export default RequestReset;
export { REQUEST_RESET_MUTATION };
