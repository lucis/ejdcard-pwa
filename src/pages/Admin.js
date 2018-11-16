import React from 'react'
import UserRoleList from '../components/UserRoleList'
import Typography from '@material-ui/core/Typography'

const Admin = () => (
  <div>
    <Typography variant="h4" align="center">
      Administração
    </Typography>
    <Typography variant="h5" align="center">
      Usuários
    </Typography>
    <UserRoleList />
  </div>
)

export default Admin
