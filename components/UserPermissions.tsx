import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import { PERMISSIONS } from '../constants';
import Error from './ErrorMessage';
import * as T from '../models';
import * as S from './styles';

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation updatePermissions($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`;

export interface UserPermissionsProps {
  user: T.User;
}

const UserPermissions: React.FC<UserPermissionsProps> = ({ user }) => {
  console.log(user);
  const [permissions, setPermissions] = useState(user.permissions);
  const [updatePermissions, { loading, error }] = useMutation(
    UPDATE_PERMISSIONS_MUTATION
  );

  const handlePermissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    let updatedPermissions = [...permissions];

    if (checked) {
      updatedPermissions.push(value as T.PERMISSIONS);
    } else {
      updatedPermissions = updatedPermissions.filter((p) => p !== value);
    }

    setPermissions(updatedPermissions);
  };

  return (
    <>
      {error && (
        <tr>
          <td colSpan={8}>
            <Error error={error} />
          </td>
        </tr>
      )}
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        {PERMISSIONS.map((permission) => (
          <td key={permission}>
            <label htmlFor={`${user.id}-permission-${permission}`}>
              <input
                id={`${user.id}-permission-${permission}`}
                type="checkbox"
                checked={permissions.includes(permission as T.PERMISSIONS)}
                value={permission}
                onChange={handlePermissionChange}
              />
            </label>
          </td>
        ))}
        <td>
          <S.SickButton
            type="button"
            disabled={loading}
            onClick={() =>
              updatePermissions({
                variables: { permissions, userId: user.id },
              })
            }
          >
            Updat{loading ? 'ing' : 'e'}
          </S.SickButton>
        </td>
      </tr>
    </>
  );
};

export default UserPermissions;
export { UPDATE_PERMISSIONS_MUTATION };
