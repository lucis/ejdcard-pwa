import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

class RealInput extends Component {
  state = {
    textValue: '',
    cents: null
  }

  onChangeMasked = e => {
    const incomingValue = e.target.value
    const centsString = incomingValue.split(',').join('')
    if (Number.isNaN(Number(centsString))) return
    let l = incomingValue.length
    if (l <= 2)
      return this.setState({
        textValue: centsString,
        cents: Number(centsString)
      })
    l = centsString.length
    const maskedValue =
      centsString.slice(0, l - 2) + ',' + centsString.slice(l - 2)
    this.setState({ textValue: maskedValue, cents: Number(centsString) })
  }

  componentDidUpdate = () => {
    const { onChange } = this.props

    onChange(this.state)
  }
  render = () => {
    const { textValue, cents } = this.state

    const { label, disabled } = this.props
    return (
      <div>
        <TextField
          id="balance"
          disabled={disabled}
          value={textValue}
          onChange={this.onChangeMasked}
          label={label}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">R$ </InputAdornment>
            )
          }}
        />
      </div>
    )
  }
}

export default RealInput
