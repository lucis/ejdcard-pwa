import React from 'react'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import ErrorIcon from '@material-ui/icons/Error'
import { withStyles } from '@material-ui/core/styles'
import withExtenso from './withExtenso'

const styles = (theme) => {

}

class OperacaoForm extends Component {
  state = {}

  render = () => {
    const {
      disabled,
      onChangeField,
      card: { cardNumber, balance, name, cellphone },
      centavosParaExtenso
    } = this.props
    
    return (
      <Fragment>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={onChangeField('name')}
              disabled={disabled}
              required
              id="name"
              name="name"
              value={name}
              label="Nome do Portador"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={16} justify="space-between">
              <Grid item xs={4}>
                <TextField
                  disabled={disabled}
                  onChange={onChangeField('number')}
                  id="cardNumber"
                  value={cardNumber}
                  label="Número"
                  type="number"
                  InputLabelProps={{ shrink: true }}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={8} style={{ paddingLeft: 5 }}>
                <TextField
                  id="cellphone"
                  name="cellphone"
                  disabled={disabled}
                  onChange={onChangeField('cellphone')}
                  label="Celular"
                  required
                  value={cellphone}
                  margin="normal"
                  InputProps={{
                    inputComponent: TextMaskCustom
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={5}>
                <RealInput
                  label="Crédito"
                  initialValue={balance}
                  disabled={false}
                  onChange={({ cents }) => {
                    onChangeField('balance')({ target: { value: cents } })
                  }}
                />
              </Grid>
              <Grid item xs={7}>
                <Typography
                  variant="subtitle2"
                  style={{ marginTop: 25, marginLeft: 10 }}
                  align="center"
                >
                  {centavosParaExtenso(balance)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

export default withStyles(styles)(OperacaoForm)
