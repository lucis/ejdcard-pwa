import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import moment from 'moment'
import RealSpan from './RealSpan'
import firebase from 'firebase/app'
require('firebase/firestore')

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
})

const loader = null

const db = firebase.firestore()
class HistoricoCartao extends Component {
  state = {
    historico: null
  }

  async componentDidMount() {
    const { cardNumber } = this.props
    const query = await db.collection('logs').where('card', '==', cardNumber).orderBy('timestamp', 'desc').get()
    const historico = []
    query.forEach(docRef => {
      historico.push({...docRef.data(), id: docRef.id})
    })
    this.setState({historico})
  }

  render = () => {
    const { classes } = this.props
    const { historico } = this.state

    if (!historico) return loader

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Operação</TableCell>
              <TableCell numeric>Valor</TableCell>
              <TableCell numeric>Hora</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historico.map(({type, balanceBefore, balanceAfter, timestamp, id}) => ({
              operacao: {'c': 'Credenciamento', 'v': 'Compra', 'u': 'Recarga', 'f': 'Finalização'}[type],
              valor: Math.abs(balanceBefore - balanceAfter),
              hora: moment(timestamp).format('DD/MM/YYYY kk:mm'),
              color: 'cu'.includes(type) ? 'secondary' : 'error',
              id
            })).map(({id, operacao, valor, hora, color}) => {
              return (
                <TableRow key={id}>
                  <TableCell>{operacao}</TableCell>
                  <TableCell>
                    <Typography color={color} component={RealSpan}>
                      {valor}
                    </Typography>
                  </TableCell>
                  <TableCell>{hora}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

HistoricoCartao.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(HistoricoCartao)
