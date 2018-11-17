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
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import SearchIcon from '@material-ui/icons/Search'
import Fuse from 'fuse.js'

require('firebase/firestore')

const loader = null

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
      const searchTerm = e.target.value
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
    const { users, userIdsShowed, loading, searchTerm, usersIds} = this.state
    if (loading) return loader
    if (!!searchTerm.trim() && !userIdsShowed.length) return null
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
