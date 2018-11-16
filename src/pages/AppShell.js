import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import HomeIcon from '@material-ui/icons/Home'
import { Route, Redirect } from 'react-router-dom'
import firebase from 'firebase/app'
import { withRouter } from 'react-router-dom'
import { withUser } from '../contexts/AuthContext'

import 'firebase/auth'
import { Admin, Home, Cadastro, Operacao, Finalizacao, Consulta} from './'

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 10, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
})

class AppShell extends React.Component {
  state = {
    open: false,
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  render() {
    const {
      classes,
      match,
      setUser,
    } = this.props

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}
        >
          <Toolbar
            disableGutters={!this.state.open}
            className={classes.toolbar}
          >
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <div className="w-40">
              <img
                src={require('../images/logo_largo_05x_with_stroke.png')}
                alt="EJD Card"
              />
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="temporary"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
            ),
          }}
          open={this.state.open}
          onClose={this.handleDrawerClose}
        >
          <div className={classes.toolbarIcon}>
            <Typography
              component="h1"
              variant="subtitle1"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Menu
            </Typography>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem
              button
              onClick={() => {
                this.props.history.push('home')
                this.handleDrawerClose()
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                firebase.auth().signOut()
                setUser(null)
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Route
            path={`${match.path}home`}
            component={Home}
          />
          <Route
            path={`${match.path}venda`}
            render={props => <Operacao op="v" {...props} />}
          />
          <Route
            path={`${match.path}recarga`}
            render={props => <Operacao op="u" {...props} />}
          />
          <Route
            path={`${match.path}finalizacao`}
            render={props => <Operacao op="f" {...props} />}
          />
          <Route path={`${match.path}cadastro`} component={Cadastro} />
          <Route path={`${match.path}consulta`} component={Consulta} />
          <Route path={`${match.path}admin`} component={Admin} />
          <Route
            exact
            path={match.path}
            render={() => <Redirect to={{ pathname: `${match.path}home` }} />}
          />
        </main>
      </div>
    )
  }
}

AppShell.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRouter(withUser(withStyles(styles)(AppShell)))
