import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    icon: {
      fontSize: 20,
      opacity: 0.9,
      marginRight: theme.spacing.unit,
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    close: {
        padding: theme.spacing.unit / 2,
      }
  });

const ErrorSnack = ({classes, value, onClose}) => {
    return (<Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={Boolean(value)}
        autoHideDuration={3000}
        onClose={onClose}
      >
        <SnackbarContent
          className={classes.error}
          message={
            <span className={classes.message}>
              <ErrorIcon className={classes.icon} />
              {value}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Fechar"
              color="inherit"
              className={classes.close}
              onClick={onClose}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>
          ]}
        />
      </Snackbar>)
}

export default withStyles(styles)(ErrorSnack)