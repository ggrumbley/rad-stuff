import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';

import { PERMISSIONS } from '../constants';
import Error from './ErrorMessage';
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

const UserPermissions = ({ user }) => {
  const [permissions, setPermissions] = useState(user.permissions);
  const [updatePermissions, { loading, error }] = useMutation(
    UPDATE_PERMISSIONS_MUTATION
  );

  const handlePermissionChange = (e) => {
    const { checked, value } = e.target;
    let updatedPermissions = [...permissions];

    if (checked) {
      updatedPermissions.push(value);
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
                checked={permissions.includes(permission)}
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

UserPermissions.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.string,
    permissions: PropTypes.array,
  }).isRequired,
};

export default UserPermissions;
export { UPDATE_PERMISSIONS_MUTATION };
