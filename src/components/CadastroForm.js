import React, { Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import NumberFormat from 'react-number-format';

const NumberFormatCustom = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      prefix="R$ "
      decimalScale={2}
      fixedDecimalScale
    />
  );
}

const CadastroForm = ({
  disabled,
  onChangeField,
  card: { cardNumber, balance, name, cellphone },
}) => {
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
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={5}>
              <TextField
                id="balance"
                disabled={disabled}
                value={balance}
                onChange={onChangeField('balance')}
                label="Crédito"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={7}>
              <Typography variant="subtitle2" style={{ marginTop: 25 }}>
                Dez Reais
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default CadastroForm
