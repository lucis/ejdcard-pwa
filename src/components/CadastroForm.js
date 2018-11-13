import React, { Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import numero from 'numero-por-extenso'
import InputMask from 'react-input-mask'
import RealInput from './RealInput'

function TextMaskCustom(props) {
  const { inputRef, ...other } = props

  return (
    <InputMask
      {...other}
      ref={inputRef}
      mask="(99) 99999-9999"
      maskChar={null}
    />
  )
}

const CadastroForm = ({
  disabled,
  onChangeField,
  card: { cardNumber, balance, name, cellphone },
}) => {
  const capitalize = text => {
    return text
      .toLowerCase()
      .split(' ')
      .map(s =>
        s.length == 1 ? s : s.charAt(0).toUpperCase() + s.substring(1)
      )
      .join(' ')
  }
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
                  inputComponent: TextMaskCustom,
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
                align='center'
              >
                {capitalize(
                  numero.porExtenso(balance / 100, numero.estilo.monetario)
                )}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default CadastroForm
