import React from 'react'
import UserRoleList from '../components/UserRoleList'
import Stats from '../components/Stats'
import Typography from '@material-ui/core/Typography'

const Admin = () => (
  <div>
    <Typography variant="h4" align="center" style={{marginBottom: 15}}>
      Administração
    </Typography>
    <Typography variant="h5" align="center" style={{marginTop: 15}}>
      Estatísticas
    </Typography>
    <Stats/>
    <Typography variant="h5" align="center" style={{marginTop: 10}}>
      Usuários
    </Typography>
    <UserRoleList />
  </div>
)

export default Admin
