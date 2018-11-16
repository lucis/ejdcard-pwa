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
import OperacaoForm from '../components/OperacaoForm'
import Resumo from '../components/Resumo'

const styles = ({ breakpoints, spacing: { unit } }) => ({
  layout: {
    width: 'auto',
    marginLeft: unit * 2,
    marginRight: unit * 2,
    [breakpoints.up(600 + unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: unit * 3,
    marginBottom: unit * 3,
    padding: unit * 2,
    [breakpoints.up(600 + unit * 3 * 2)]: {
      marginTop: unit * 6,
      marginBottom: unit * 6,
      padding: unit * 3,
    },
  },
  stepper: {
    padding: `${unit * 3}px 0 ${unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  returnButton: {
    marginTop: 10
  }
})


class Operacao extends React.Component {
  state = {
    card: null,
    operation: null,
  }

  handleReset = () => {
    this.setState({
      card: null,
      operation: null,
    })
  }

  onFinishOp = (card, operation) => this.setState({ card, operation })

  render() {
    const { classes, op } = this.props
    const { card, operation } = this.state


    const title = {v: 'Venda', u: 'Recarga', 'f': 'Finalização'}[op]
    const steps = ['Dados da Operação', 'Resumo']

    return (
      <Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              {title}
            </Typography>
            <Stepper activeStep={card ? 1 : 0} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Fragment>
              {card ? (
                <Resumo card={card} operation={operation} />
              ) : (
                <OperacaoForm op={op} onFinishOp={this.onFinishOp} />
              )}
              {card && (
                <div className={classes.buttons}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleReset}
                    className={classes.returnButton}
                  >
                    {'Nova ' + title}
                  </Button>
                </div>
              )}
            </Fragment>
          </Paper>
        </main>
      </Fragment>
    )
  }
}

Operacao.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Operacao)