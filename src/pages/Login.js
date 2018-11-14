import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import {
  FacebookLoginButton,
  GoogleLoginButton
} from "react-social-login-buttons";
import { Redirect } from "react-router-dom";
import { withUser } from "../contexts/AuthContext";
import { withLoading } from "../contexts/LoadingContext";
import firebase from "firebase/app";
import "firebase/auth";
require("firebase/firestore");

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  }
});

const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

class Login extends Component {
  state = {
    redirectTo: null
  };

  componentDidMount() {
    const {
      user: userFromContext,
      setUser,
      showLoading,
      hideLoading
    } = this.props;
    showLoading()
    // Remove the 'false' if too much login attempts are happening
    if (false && userFromContext) {
      return this.setState({ redirectTo: { pathname: "/app" } });
    }

    firebase.auth().onAuthStateChanged(async user => {

      if (user) {
        showLoading();
        let userFromDb;

        const query = await db
          .collection("users")
          .where("authId", "==", user.uid)
          .limit(1)
          .get();

        if (query.empty) {
          const { photoURL, displayName, email, uid } = user;

          const newUserData = {
            uid,
            name: displayName,
            email,
            picUrl: photoURL,
            authorized: false,
            roles: "r",
            lastLogin: Date.now(),
            isAdmin: false,
            createdAt: Date.now()
          };
          userFromDb = newUserData;
          await db
            .collection("users")
            .doc(uid)
            .set(newUserData);

        } else {
          query.forEach(snap => {
            userFromDb = snap.data();
          });

          await db
            .collection("users")
            .doc(user.uid)
            .set({ lastLogin: Date.now() }, { merge: true });
          
          }
        setUser(userFromDb);
        hideLoading();
        this.setState({ redirectTo: { pathname: "/app" } });
      } else { hideLoading()  }
    });
  }

  loginWithFacebook = () => {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(facebookProvider);
  };

  loginWithGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(googleProvider);
  };

  render = () => {
    const { classes } = this.props;
    const { redirectTo } = this.state;

    if (redirectTo) return <Redirect to={redirectTo} />;

    const socialButtonSytle = {
      width: "90%",
      fontFamily: "Product Sans",
      textAlign: "center",
      marginTop: "1rem"
    };
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <div className="w-90 pa2">
            <img src={require("../images/logo_largo_05x.png")} alt="EJD Card" />
          </div>
          <Typography variant="subtitle1">Faça login para utilizar</Typography>
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
          <Typography variant="subtitle1" className="pt2">
            ou
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">digite seu e-mail</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="none" required fullWidth>
              <InputLabel htmlFor="password">digite sua senha</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                className="mb4"
              />
            </FormControl>
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
    );
  };
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withLoading(withUser(withStyles(styles)(Login)));
