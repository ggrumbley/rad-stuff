import React from 'react';
import { gql, useMutation } from '@apollo/client';

import Error from './ErrorMessage';

import * as S from './styles';
import { CURRENT_USER_QUERY } from '../utils';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
};

const Signin = () => {
  const [state, setState] = React.useState(INITIAL_STATE);
  const [signin, { loading, error }] = useMutation(SIGNIN_MUTATION);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <S.Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        await signin({
          variables: state,
          refetchQueries: [{ query: CURRENT_USER_QUERY }],
        });
        setState(INITIAL_STATE);
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign into your account</h2>
        <Error error={error} />
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="email"
            value={state.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="password"
            value={state.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign In</button>
      </fieldset>
    </S.Form>
  );
};

export default Signin;
export { SIGNIN_MUTATION };
