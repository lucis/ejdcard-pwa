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
import ContentLoader from 'react-content-loader'
import RealSpan from './RealSpan'
import firebase from 'firebase/app'
require('firebase/firestore')

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 500,
  },
})

const loader = (
  <ContentLoader
    height={475}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="18" y="14" rx="5" ry="5" width="364" height="40" />
    <rect x="129.73" y="115" rx="0" ry="0" width="15.61" height="1" />
    <rect x="17" y="65" rx="5" ry="5" width="364" height="40" />
    <rect x="17" y="118" rx="5" ry="5" width="364" height="40" />
    <rect x="16" y="170" rx="5" ry="5" width="364" height="40" />
    <rect x="15" y="225" rx="5" ry="5" width="364" height="40" />
  </ContentLoader>
)

const db = firebase.firestore()
class HistoricoCartao extends Component {
  state = {
    historico: null,
  }

  async componentDidMount() {
    const { cardNumber } = this.props
    const query = await db
      .collection('logs')
      .where('card', '==', cardNumber)
      .orderBy('timestamp', 'desc')
      .get()
    const historico = []
    query.forEach(docRef => {
      historico.push({ ...docRef.data(), id: docRef.id })
    })
    const historicoTurbinado = await Promise.all(historico.map((log) => {
      const { userId } = log
      return db.collection('users').doc(userId).get().then(docRef => {
        return {...log, user: docRef.data().name}
      })
    }))
    this.setState({ historico: historicoTurbinado })
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
              <TableCell>Valor</TableCell>
              <TableCell>Hora</TableCell>
              <TableCell>Operador</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historico
              .map(({ type, balanceBefore, balanceAfter, timestamp, id, user }) => ({
                operacao: {
                  c: 'Credenciamento',
                  v: 'Compra',
                  u: 'Recarga',
                  f: 'Finalização',
                }[type],
                valor: Math.abs(balanceBefore - balanceAfter),
                hora: moment(timestamp).format('DD/MM/YYYY kk:mm'),
                color: 'cu'.includes(type) ? 'secondary' : 'error',
                id,
                user
              }))
              .map(({ id, operacao, valor, hora, color, user }) => {
                return (
                  <TableRow key={id}>
                    <TableCell>{operacao}</TableCell>
                    <TableCell>
                      <Typography
                        color={color}
                        component={RealSpan}
                        align="center"
                      >
                        {valor}
                      </Typography>
                    </TableCell>
                    <TableCell>{hora}</TableCell>
                    <TableCell>
                    <Typography align='center'>
                    {user}
                    </Typography>
                    </TableCell>
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
