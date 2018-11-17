import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import DetalheSorteio from '../components/DetalheSorteio'
import firebase from 'firebase/app'
import CircularProgress from '@material-ui/core/CircularProgress';
require('firebase/firestore')

const styles = theme => {}

const db = firebase.firestore()

class Sorteio extends Component {
  state = {
    loadingCards: false,
    card: null
  }

  handleSubmit = async () => {
    this.setState({ loadingCards: true })
    const query = await db.collection('cards').where('active', '==', true).get()
    const theOne = parseInt(Math.random() * 100) % query.size
    this.setState({card: query.docs[theOne].data(), loadingCards: false})
  }

  render = () => {
    const { card, loadingCards } = this.state

    return (
      <Fragment>
        <Card>
          <CardContent>
            <Typography component="h1" variant="h4" align="center">
              Sorteio
            </Typography>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
                disabled={loadingCards}
                style={{  marginTop: 10, marginBottom: 10 }}
              >
                {!loadingCards &&  'Realizar Sorteio'}
                {loadingCards && <CircularProgress size={18}/>}
              </Button>
            </div>
            {card && <DetalheSorteio card={card} hideHistorico={true}/>}
          </CardContent>
        </Card>
      </Fragment>
    )
  }
}

export default withStyles(styles)(Sorteio)