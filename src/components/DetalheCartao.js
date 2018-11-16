import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import RealSpan from './RealSpan'
import Typography from '@material-ui/core/Typography'
import HistoricoCartao from './HistoricoCartao'

const styles = {
  pos: {
    marginBottom: 12,
  },
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  real: {
    fontSize: '19px',
  },
}

const DetalheCartao = ({
  classes,
  card: { number, name, balance, active, cellphone },
}) => {
  return (
    <Fragment>
      <div className={classes.root}>
        <div
          style={{
            borderRight: '1px solid #ccc',
            paddingRight: '10px',
            width: '60%',
          }}
        >
          <div>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              donx
            </Typography>
            <Typography variant="h6" component="h2" color={'secondary'}>
              {name}
            </Typography>
          </div>
          <div style={{ paddingTop: 10 }}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              celular
            </Typography>
            <Typography variant="subtitle1" component="h2" color="secondary">
              {cellphone || ' -- '}
            </Typography>
          </div>
        </div>
        <div>
          <div>
            <Typography
              className={classes.title}
              color="textSecondary"
              align="right"
              gutterBottom
            >
              saldo atual
            </Typography>
            <Typography
              variant="h6"
              className={classes.real}
              component={RealSpan}
              color="primary"
              align="right"
              noWrap
            >
              {balance}
            </Typography>
          </div>
          <div style={{ paddingTop: 10 }}>
            <Typography
              className={classes.title}
              color="textSecondary"
              align="right"
              gutterBottom
            >
              status
            </Typography>
            <Typography
              variant="h6"
              className={classes.real}
              component="h2"
              color={!active ? 'error' : 'secondary'}
              align="right"
              noWrap
            >
              {active ? 'ATIVO' : 'INATIVO'}
            </Typography>
          </div>
        </div>
      </div>
      {number && <Typography variant="h6" align="center">Histórico</Typography>}
      {number && <HistoricoCartao cardNumber={number} />}
    </Fragment>
  )
}

DetalheCartao.propTypes = {
  classes: PropTypes.object.isRequired,
  card: PropTypes.object,
}

export default withStyles(styles)(DetalheCartao)
