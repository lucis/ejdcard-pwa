import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ErrorSnack from '../components/ErrorSnack'
import OperacaoForm from '../components/OperacaoForm'

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
})

const steps = ['Dados do Compra', 'Resumo']

class Venda extends React.Component {
  state = {
    showResumo: false,
  }

  setError = error => {
    this.setState({ error })
  }

  handleSubmit = async () => {}

  handleReset = () => {
    this.setState({
      showResumo: false,
    })
  }

  checkValidity = () => {
    const {
      card: { name, number },
    } = this.state
    if (!name || name.length < 5 || !number || number > 700 || number < 0)
      return
    this.setState({ isValid: true })
  }

  handleCloseError = () => {
    this.setError(null)
  }

  render() {
    const { classes } = this.props
    const { isValid, error, showResumo } = this.state

    return (
      <Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Venda
            </Typography>
            <Stepper
              activeStep={showResumo ? 1 : 0}
              className={classes.stepper}
            >
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Fragment>
              {showResumo ? null : <OperacaoForm op="v" />}
              {showResumo && (
                <div className={classes.buttons}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!isValid}
                    onClick={this.handleSubmit}
                    className={classes.button}
                  >
                    Nova Venda
                  </Button>
                </div>
              )}
            </Fragment>
          </Paper>
        </main>
        <ErrorSnack value={error} onClose={this.handleCloseError} />
      </Fragment>
    )
  }
}

Venda.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Venda)
