import React from 'react';
import { gql, useQuery } from '@apollo/client';

import UserPermissions from './UserPermissions';
import Error from './ErrorMessage';
import { PERMISSIONS } from '../constants';
import * as S from './styles';

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const Admin = () => {
  const { data, loading, error } = useQuery(ALL_USERS_QUERY);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Error error={error} />
      <div>
        <h2>Manage Permissions</h2>
        <S.Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {PERMISSIONS.map((permission) => (
                <th key={permission}>{permission}</th>
              ))}
              <th>👇🏻</th>
            </tr>
          </thead>
          <tbody>
            {data.users &&
              data.users.map((user) => (
                <UserPermissions user={user} key={user.id} />
              ))}
          </tbody>
        </S.Table>
      </div>
    </div>
  );
};

export default Admin;
export { ALL_USERS_QUERY };
