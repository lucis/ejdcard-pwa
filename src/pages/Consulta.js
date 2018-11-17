import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import { debounce } from 'lodash'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import SearchIcon from '@material-ui/icons/Search'
import ErrorSnack from '../components/ErrorSnack'
import DetalheCartao from '../components/DetalheCartao'
import firebase from 'firebase/app'
require('firebase/firestore')

const styles = theme => {}

const db = firebase.firestore()

class Consulta extends Component {
  state = {
    loadingCard: false,
    cardNumber: '',
    name: '',
    card: null,
    error: null,
    showInfo: false,
  }

  searchCardDebounced = debounce(async () => {
    let { cardNumber } = this.state
    this.setState({ loadingCard: true, card: null })
    try {
      const query = await db
        .collection('cards')
        .where('number', '==', String(Number(cardNumber)))
        .get()
      if (query.empty)
        return this.setState({
          error: 'Não existe um cartão cadastrado com esse número',
          loadingCard: false,
          cardNumber: '',
        })
      query.forEach(docRef => {
        const card = docRef.data()
        this.setState({
          card: { ...card, id: docRef.id },
          loadingCard: false,
        })
      })
    } catch (e) {
      this.setState({
        error: 'Ocorreu um erro ao buscar dados do cartão',
        loadingCard: false,
      })
    }
  }, 1000)

  onChangeNumber = e => {
    const cardNumber = e.target.value
    this.setState(
      { cardNumber, error: null, showInfo: null },
      this.searchCardDebounced
    )
  }

  onChangeName = e => {
    const name = e.target.value
    this.setState({ name, error: null, showInfo: null })
  }

  handleCloseError = () => {
    this.setState({ error: null })
  }

  checkValid = () => {
    const { name, card } = this.state
    if (!name || !card || !card.name) return false
    return name.slice(0, 2) === '20' || card.name.slice(0, 2).toLowerCase() === name.slice(0, 2).toLowerCase()
  }

  handleSubmit = async () => {
    this.setState({ showInfo: true })
  }

  render = () => {
    const { loadingCard, cardNumber, card, name, error, showInfo } = this.state

    return (
      <Fragment>
        <Card>
          <CardContent>
            <Typography component="h1" variant="h4" align="center">
              Consulta
            </Typography>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-around',
              }}
            >
              <TextField
                style={{ paddingRight: 15, width: '35%' }}
                disabled={loadingCard}
                onChange={this.onChangeNumber}
                id="cardNumber"
                value={cardNumber}
                label="Cartão"
                type="number"
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />
              <TextField
                style={{ paddingRight: 15 }}
                onChange={this.onChangeName}
                id="cardNumber"
                value={name}
                label="Seu primeiro nome"
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                disabled={!this.checkValid() || showInfo}
                onClick={this.handleSubmit}
                style={{ marginBottom: 8 }}
              >
                <SearchIcon />
              </Button>
            </div>
            {showInfo && <DetalheCartao card={card} />}
            <ErrorSnack
              visible={!!error}
              value={error}
              onClose={this.handleCloseError}
            />
          </CardContent>
        </Card>
      </Fragment>
    )
  }
}

export default withStyles(styles)(Consulta)
