import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
});

function getSteps() {
  return ['Credencie-se', 'Compre', 'Recarregue', 'Finalize'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Na entrada do evento, membros da Comunicação estarão disponíveis para o credenciamento dos cartões. Você já pode carregar um valor inicial.`;
    case 1:
      return 'Na Lojinha, Lanchonete, ou com ambulantes você poderá efetuar suas compras estando com seu cartão.';
    case 2:
      return `Ao longo do evento, você poderá carregar mais dinheiro no seu cartão.`;
    case 3:
      return `No final, você deve realizar a finalização, podendo resgatar seu saldo restante.`;
    default:
      return 'Unknown step';
  }
}

class StepperInicial extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{getStepContent(index)}</Typography>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Voltar
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Finalize' : 'Próximo'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography align="center">Bom evento :)</Typography>
          </Paper>
        )}
      </div>
    );
  }
}

StepperInicial.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(StepperInicial);
