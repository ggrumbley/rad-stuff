import React from 'react';
import { gql, useMutation } from '@apollo/client';

import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from '../utils';

import * as S from './styles';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
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

const Signup = () => {
  const [state, setState] = React.useState(INITIAL_STATE);
  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <S.Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        await signup({
          variables: state,
          refetchQueries: [{ query: CURRENT_USER_QUERY }],
        });
        setState(INITIAL_STATE);
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign up for an Account</h2>
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
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            placeholder="name"
            value={state.name}
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
        <button type="submit">Sign Up!</button>
      </fieldset>
    </S.Form>
  );
};

export default Signup;
export { SIGNUP_MUTATION };
