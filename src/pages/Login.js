import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper'
import {
  FacebookLoginButton,
  GoogleLoginButton
} from 'react-social-login-buttons'
import firebase from 'firebase/app'
import 'firebase/auth'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  }
})
class Login extends Component {
  componentDidMount() {
    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //   }
    // })
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

    const socialButtonSytle = {
      width: '90%',
      fontFamily: 'Product Sans',
      textAlign: 'center',
      marginTop: '1rem'
    }
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <div className="w-90 pa2">
            <img src={require('../images/logo_largo_05x.png')} alt="EJD Card" />
          </div>
          <Typography variant="subtitle1">Faça login para utilizar</Typography>
          <FacebookLoginButton
            style={socialButtonSytle}
            onClick={this.loginWithFacebook}
          >
            <span className="tc pl2">Entre com Facebook</span>
          </FacebookLoginButton>
          <GoogleLoginButton
            style={socialButtonSytle}
            onClick={this.loginWithGoogle}
          >
            <span className="tc pl2 ">Entre com Google</span>
          </GoogleLoginButton>
          <Typography variant="subtitle1" className="pt2">ou</Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">digite seu e-mail</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">digite sua senha</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
          </form>
        </Paper>
      </main>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login)
