import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Input from '@material-ui/core/Input'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Done from '@material-ui/icons/Done'
import CircularProgress from '@material-ui/core/CircularProgress'
import firebase from 'firebase/app'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import SearchIcon from '@material-ui/icons/Search'
import ContentLoader from 'react-content-loader'
import Fuse from 'fuse.js'

require('firebase/firestore')

const loader = (
  <ContentLoader
    height={160}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <circle cx="54.12" cy="38.12" r="25.12" /> 
		<rect x="96" y="13.69" rx="5" ry="5" width="266.2" height="12.1" /> 
		<circle cx="638" cy="67" r="8" /> 
		<rect x="653" y="62" rx="5" ry="5" width="220" height="10" /> 
		<circle cx="638" cy="97" r="8" /> 
		<rect x="653" y="92" rx="5" ry="5" width="220" height="10" /> 
		<circle cx="638" cy="127" r="8" /> 
		<rect x="653" y="122" rx="5" ry="5" width="220" height="10" /> 
		<rect x="651" y="150" rx="5" ry="5" width="220" height="10" /> 
		<circle cx="638" cy="154" r="8" /> 
		<circle cx="54.12" cy="103.12" r="25.12" /> 
		<rect x="97" y="79.69" rx="5" ry="5" width="266.2" height="12.1" /> 
		<circle cx="54.12" cy="166.12" r="25.12" /> 
		<rect x="98" y="144.69" rx="5" ry="5" width="266.2" height="12.1" /> 
		<circle cx="57.12" cy="230.12" r="25.12" /> 
		<rect x="97" y="203.69" rx="5" ry="5" width="266.2" height="12.1" />
  </ContentLoader>
)

class UserRoleList extends Component {
  state = {
    loading: false,
    users: {},
    usersIds: [],
    userIdsShowed: [],
    searchTerm: '',
  }

  componentDidMount = async () => {
    this.loadUsers()
  }

  loadUsers = async () => {
    this.setState({ loading: true })
    const usersLoaded = {}
    const usersIds = []
    const query = await firebase
      .firestore()
      .collection('users')
      .get()
    query.forEach(doc => {
      const userData = doc.data()
      usersLoaded[userData.uid] = { ...userData, loading: false }
      usersIds.push(userData.uid)
    })
    this.setState({
      loading: false,
      users: usersLoaded,
      usersIds,
      userIdsShowed: usersIds,
    })
  }

  setUserLoading = (uid, loading) => {
    this.setUserProp('loading')(uid, loading)
  }

  setUserProp = prop => (uid, value) => {
    const userRef = this.state.users[uid]
    this.setState({
      users: { ...this.state.users, [uid]: { ...userRef, [prop]: value } },
    })
  }

  updateUserRoles = async uid => {
    this.setUserLoading(uid, true)
    const { roles } = this.state.users[uid]
    await firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .set({ roles }, { merge: true })
    this.setUserLoading(uid, false)
  }

  handleSearchFor = itens => {
    const fuse = new Fuse(itens, { threshold: 0.3, keys: ['name', 'email'] })
    return e => {
      const searchTerm = String(e.target.value)
      const userIdsShowed = fuse.search(searchTerm).map(item => item.uid)
      this.setState({ searchTerm, userIdsShowed })
    }
  }

  setUserRoles = (uid, roles) => {
    this.setUserProp('roles')(uid, roles)
  }

  renderListItem = ({ uid, name, picUrl, email, roles, loading }) => {
    const emailTruncated = email && email.split('@')[0] + '@...'
    return (
      <ListItem key={uid} button>
        <Avatar alt={name} src={picUrl} />
        <ListItemText primary={name} secondary={emailTruncated} />
        <ListItemSecondaryAction
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Input
            disabled={loading}
            value={roles}
            onChange={e => {
              this.setUserRoles(uid, e.target.value)
            }}
            style={{ width: '20%', height: '50%' }}
          />
          <IconButton
            component="button"
            onClick={() => {
              this.updateUserRoles(uid)
            }}
          >
            {!loading && <Done />}
            {loading && (
              <CircularProgress size={25} color="primary" thickness={3} />
            )}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }

  render = () => {
    const { users, userIdsShowed, loading, searchTerm, usersIds } = this.state
    if (loading) return loader
    const userIdsUsed = searchTerm.trim() ? userIdsShowed : usersIds
    return (
      <div>
        <FormControl fullWidth>
          <Input
            id="adornment-amount"
            value={searchTerm}
            onChange={this.handleSearchFor(usersIds.map(uid => users[uid]))}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <List dense>
          {userIdsUsed.map(uid => users[uid]).map(this.renderListItem)}
        </List>
      </div>
    )
  }
}

export default UserRoleList
