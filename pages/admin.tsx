import React from 'react';

import AuthGuard from '../components/AuthGuard';
import Admin from '../components/Admin';

const AdminPage = () => (
  <div>
    <AuthGuard>
      <Admin />
    </AuthGuard>
  </div>
);

export default AdminPage;
