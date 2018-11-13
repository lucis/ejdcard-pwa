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
      card: { cardNumber, balance, name, cellphone }
    } = this.props
    
    return (
      <Fragment>
      </Fragment>
    )
  }
}

export default withExtenso(withStyles(styles)(OperacaoForm))
