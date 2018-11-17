import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import RefreshIcon from '@material-ui/icons/Refresh'
import CircularProgress from '@material-ui/core/CircularProgress'
import RealSpan from './RealSpan'
import firebase from 'firebase/app'
require('firebase/firestore')

const styles = {
  card: {
    minWidth: 275
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}

const db = firebase.firestore()
class Stats extends Component {
  state = {
    pristine: true,
    loading: false,
    stats: null,
  }

  carregar = async () => {
    this.setState({ pristine: false, loading: true })
    const query = await db.collection('stats').doc('2018').get()
    this.setState({loading: false, stats: query.data()})
  }

  render = () => {
    const { classes } = this.props
    const { pristine, loading, stats } = this.state

    const { cards, incoming, outcoming, users } = stats || {}

    return (
      <Card className={classes.card}>
        <CardContent>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            {loading && <CircularProgress size={18} />}
            {pristine && !loading && (
              <Button onClick={this.carregar}>Carregar</Button>
            )}
            {!pristine && !loading && (
              <IconButton
                key="close"
                aria-label="Fechar"
                color="inherit"
                onClick={this.carregar}
              >
                <RefreshIcon />
              </IconButton>
            )}
          </div>
          {stats && <Fragment>
            <Typography
              className={classes.title}
              align="center"
              color="textSecondary"
              gutterBottom
            >
              há
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="primary"
              component="h2"
            >
              {cards} cartões
            </Typography>
            <Typography
              align="center"
              color="textSecondary"
              style={{ marginBottom: 15 }}
            >
              cadastrados
            </Typography>
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <Typography
                  component="b"
                  align="center"
                  variant="subtitle1"
                  style={{
                    color: 'green',
                    fontWeight: 'bold',
                    marginBottom: -8,
                  }}
                >
                  + {<RealSpan>{incoming}</RealSpan>}
                </Typography>
                <Typography color="textSecondary" align="center">
                  recargas
                </Typography>
              </div>
              <div>
                <Typography
                  component="b"
                  align="center"
                  variant="subtitle1"
                  style={{ color: 'red', fontWeight: 'bold', marginBottom: -8 }}
                >
                  - {<RealSpan>{outcoming}</RealSpan>}
                </Typography>
                <Typography color="textSecondary" align="center">
                  vendas
                </Typography>
              </div>
              <div>
                <Typography
                  align="center"
                  component="b"
                  variant="subtitle1"
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    marginBottom: -8,
                  }}
                >
                  {users}
                </Typography>
                <Typography color="textSecondary" align="center">
                  usuários
                </Typography>
              </div>
            </div>
          </Fragment>}
        </CardContent>
      </Card>
    )
  }
}

Stats.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Stats)
