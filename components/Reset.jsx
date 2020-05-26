import React from 'react';
import { gql, useMutation } from '@apollo/client';

import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from '../utils';

import * as S from './styles';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`;

const INITIAL_STATE = {
  password: '',
  confirmPassword: '',
};

const Reset = ({ resetToken }) => {
  const [state, setState] = React.useState(INITIAL_STATE);
  console.log(resetToken);

  const [reset, { loading, error }] = useMutation(RESET_MUTATION);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <S.Form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        await reset({
          variables: {
            resetToken,
            password: state.password,
            confirmPassword: state.confirmPassword,
          },
          refetchQueries: [{ query: CURRENT_USER_QUERY }],
        });
        setState(INITIAL_STATE);
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Reset Your Password</h2>
        <Error error={error} />
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

        <label htmlFor="confirmPassword">
          Confirm Your Password
          <input
            type="password"
            name="confirmPassword"
            placeholder="confirmPassword"
            value={state.confirmPassword}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Reset Your Password!</button>
      </fieldset>
    </S.Form>
  );
};

export default Reset;
export { RESET_MUTATION };
