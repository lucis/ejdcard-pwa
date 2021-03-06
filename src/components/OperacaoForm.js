import React, { Component, Fragment } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import { debounce } from 'lodash'
import RealInput from './RealInput'
import OperacaoReview from './OperacaoReview'
import ErrorSnack from '../components/ErrorSnack'
import withExtenso from './withExtenso'
import { withUser } from '../contexts/AuthContext'
import firebase from 'firebase/app'
require('firebase/firestore')

const styles = theme => {}

const db = firebase.firestore()

class OperacaoForm extends Component {
  state = {
    pristine: true,
    loadingCard: false,
    loadingOperation: false,
    cardNumber: '',
    operationAmount: 0,
    card: null,
    error: null,
  }

  reset = () => {
    this.setState({
      pristine: true,
      loadingCard: false,
      loadingOperation: false,
      cardNumber: '',
      operationAmount: 0,
      card: null,
      error: null,
    })
  }
  searchCardDebounced = debounce(async () => {
    let { cardNumber } = this.state
    // FIX - CardNumbers should be string in Firebase
    this.setState({ loadingCard: true, card: null })
    try {
      const query = await db
        .collection('cards')
        .where('number', '==', cardNumber)
        .get()
      if (query.empty)
        return this.setState({
          error: 'Não existe um cartão cadastrado com esse número',
          pristine: true,
          loadingCard: false,
          cardNumber: '',
        })
      query.forEach(docRef => {
        const card = docRef.data()
        if (!card.active) {
          return this.setState({
            error: 'O cartão com este número foi desativado',
            loadingCard: false,
            cardNumber: '',
          })
        }
        this.setState({
          card: { ...card, id: docRef.id },
          pristine: false,
          loadingCard: false,
        })
      })
    } catch (e) {
      this.setState({
        pristine: true,
        error: 'Ocorreu um erro ao buscar dados do cartão',
        loadingCard: false,
      })
    }
  }, 1000)

  onChangeNumber = e => {
    const cardNumber = e.target.value
    this.setState({ cardNumber, error: null }, this.searchCardDebounced)
  }

  calcFutureBalance = () => {
    const { card, operationAmount } = this.state
    if (!card) return null
    const { op } = this.props
    if (!'vu'.includes(op)) return card.balance
    let operand = operationAmount
    if (op === 'v') operand = operand * -1
    return card.balance + operand
  }

  prepareLog = ({ number, balance }, futureBalance, uid) => {
    const { op } = this.props
    return {
      type: op,
      timestamp: Date.now(),
      card: number,
      userId: uid,
      balanceBefore: balance,
      balanceAfter: futureBalance,
    }
  }

  handleCloseError = () => {
    this.setState({ error: null })
  }

  isFinalizacao = () => this.props.op === 'f'

  checkValid = () => {
    const {
      pristine,
      loadingCard,
      cardNumber,
      operationAmount,
      card,
    } = this.state

    const futureBalance = this.calcFutureBalance()

    return (
      !pristine &&
      !loadingCard &&
      cardNumber &&
      card &&
      card.number &&
      cardNumber === card.number &&
      card.active &&
      (this.isFinalizacao()
        ? true
        : operationAmount &&
          Number(operationAmount) !== 0 &&
          futureBalance !== null &&
          futureBalance >= 0)
    )
  }

  executeOperation = (card, patch) => {
    const {
      user: { uid },
    } = this.props
    return new Promise(resolve => {
      const batch = db.batch()
      const cardRef = db.collection('cards').doc(card.id)
      batch.set(cardRef, patch, { merge: true })
      const logRef = db.collection('logs').doc()
      const logData = this.prepareLog(card, patch.balance, uid)
      batch.set(logRef, logData)
      batch
        .commit()
        .then(() => resolve(logRef.id))
        .catch(() => resolve())
    })
  }

  handleSubmit = async () => {
    this.setState({ loadingOperation: true })
    const { onFinishOp, op } = this.props
    const { card } = this.state
    const futureBalance = this.calcFutureBalance()
    const patch = {
      balance: futureBalance,
      active: !this.isFinalizacao(),
    }
    const logId = await this.executeOperation(card, patch)
    if (!logId)
      return this.setError('Ocorreu um erro ao tentar realizar a  operação')
    card.balance = futureBalance
    const cardBackup = { ...card }
    const { operationAmount: amount } = this.state
    this.reset()
    onFinishOp(cardBackup, { type: op, code: logId, amount })
  }

  setError = error => {
    this.setState({ error, loadingOperation: false })
  }

  render = () => {
    const { op, centavosParaExtenso } = this.props

    const btnText = { v: 'Debitar', u: 'Creditar', f: 'Finalizar' }[op]

    const isFinalizacao = this.isFinalizacao()
    const {
      pristine,
      loadingCard,
      loadingOperation,
      cardNumber,
      operationAmount,
      card,
      error,
    } = this.state

    return (
      <Fragment>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{ width: '50%', display: 'flex', alignItems: 'flex-end' }}
          >
            <TextField
              style={{ paddingRight: 15, width: '70%' }}
              disabled={loadingCard}
              onChange={this.onChangeNumber}
              id="cardNumber"
              value={cardNumber}
              label="Cartão"
              type="number"
              InputLabelProps={{ shrink: true }}
              margin="normal"
            />
            <div style={{ height: '25px', paddingBottom: '35px' }}>
              {loadingCard && <CircularProgress size={25} />}
            </div>
          </div>
          <div style={{ width: '45%' }}>
            {!isFinalizacao && (
              <RealInput
                label="Valor"
                initialValue={0}
                disabled={false}
                onChange={({ cents }) => {
                  this.handleCloseError()
                  this.setState({ operationAmount: cents })
                }}
              />
            )}
          </div>
        </div>

        {!isFinalizacao && (
          <Typography
            style={{
              textTransform: 'uppercase',
              backgroundColor: '#ccc',
              fontSize: 10,
            }}
            variant="subtitle2"
            color="textSecondary"
            align="center"
          >
            {centavosParaExtenso(operationAmount) || ' -- '}
          </Typography>
        )}
        {
          <OperacaoReview
            visible={!pristine}
            card={card}
            futureBalance={this.calcFutureBalance()}
            disabled={loadingOperation}
          />
        }
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 15 }}
        >
          <Button
            variant="contained"
            color="primary"
            disabled={!this.checkValid() || loadingOperation}
            onClick={this.handleSubmit}
          >
            {loadingOperation && (
              <CircularProgress
                style={{ color: 'white' }}
                size={20}
                thickness={3}
              />
            )}
            {!loadingOperation && btnText}
          </Button>
        </div>
        <ErrorSnack visible={!!error} value={error} onClose={this.handleCloseError} />
      </Fragment>
    )
  }
}

export default withUser(withExtenso(withStyles(styles)(OperacaoForm)))
