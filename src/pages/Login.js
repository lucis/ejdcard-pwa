import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons'
import { Redirect } from 'react-router-dom'
import { withUser } from '../contexts/AuthContext'
import { withLoading } from '../contexts/LoadingContext'
import StepperInicial from '../components/StepperInicial'
import firebase from 'firebase/app'
import 'firebase/auth'
require('firebase/firestore')

const styles = theme => ({
  main: {
    width: 'auto',
    height: '100%',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    marginBottom: `${theme.spacing.unit * 4}px`,
  },
  link: {
    color: theme.palette.primary.main
  }
})

const db = firebase.firestore()
const settings = { timestampsInSnapshots: true }
db.settings(settings)

class Login extends Component {
  state = {
    redirectTo: null,
  }

  componentDidMount() {
    const {
      user: userFromContext,
      setUser,
      showLoading,
      hideLoading,
      location: { state },
    } = this.props
    showLoading()

    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        showLoading()
        let userFromDb

        const query = await db
          .collection('users')
          .where('uid', '==', user.uid)
          .limit(1)
          .get()

        if (query.empty) {
          const { photoURL, displayName, email, uid } = user

          const newUserData = {
            uid,
            name: displayName,
            email,
            picUrl: photoURL,
            // roles: 'r',
            lastLogin: Date.now(),
            createdAt: Date.now(),
          }
          userFromDb = newUserData
          await db
            .collection('users')
            .doc(uid)
            .set(newUserData)
        } else {
          query.forEach(snap => {
            userFromDb = snap.data()
          })

          // Improve refresh time
          // await db
          //   .collection('users')
          //   .doc(user.uid)
          //   .set({ lastLogin: Date.now() }, { merge: true })
        }
        setUser(userFromDb)
        this.setState({
          redirectTo: (state && state.from) || { pathname: '/app' },
        })
        hideLoading()
      } else {
        hideLoading()
      }
    })
  }

  loginWithFacebook = () => {
    const facebookProvider = new firebase.auth.FacebookAuthProvider()
    firebase.auth().signInWithRedirect(facebookProvider)
  }

  loginWithGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(googleProvider)
  }

  render = () => {
    const { classes } = this.props
    const { redirectTo } = this.state

    if (redirectTo) return <Redirect to={redirectTo} />

    const socialButtonSytle = {
      width: '90%',
      fontFamily: 'Product Sans',
      textAlign: 'center',
      marginTop: '1rem',
    }
    return (
      <div className={classes.root}>
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <div className="w-90 pa2">
              <img
                src={require('../images/logo_largo_05x.png')}
                alt="EJD Card"
              />
            </div>
            <Typography variant="subtitle2" color="primary" align="center">
              Pagamentos no Encontrão EJD 2018
            </Typography>
            <StepperInicial />
            <Typography variant="subtitle2">
              Faça login para utilizar
            </Typography>
            <FacebookLoginButton
              style={socialButtonSytle}
              onClick={this.loginWithFacebook}
            >
              <span className="tc pl2 f6">Entre com Facebook</span>
            </FacebookLoginButton>
            <GoogleLoginButton
              style={socialButtonSytle}
              onClick={this.loginWithGoogle}
            >
              <span className="tc pl2 f6">Entre com Google</span>
            </GoogleLoginButton>
            <Typography style={{marginTop: 10}} variant="subtitle2" align="center">Desenvolvido com {"<3"} por <a className={classes.link} target="_blank" href="https://instagram.com/luciannojunior">@luciannojunior</a></Typography>
          </Paper>
        </main>
      </div>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withLoading(withUser(withStyles(styles)(Login)))
