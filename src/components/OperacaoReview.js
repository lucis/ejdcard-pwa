import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import ContentLoader from 'react-content-loader'
import withAnimation from './withAnimation'
import RealSpan from './RealSpan'

const loader = (
  <ContentLoader
    height={200}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    style={{ padding: 5, height: '100%' }}
  >
    <rect x="7.77" y="15.83" rx="0" ry="0" width="80" height="10" />
    <rect x="6.77" y="33.83" rx="0" ry="0" width="181" height="30" />
    <rect x="299.77" y="13.83" rx="0" ry="0" width="80" height="10" />
    <rect x="263.77" y="34.83" rx="0" ry="0" width="121.27" height="57" />
    <rect x="303.77" y="108.83" rx="0" ry="0" width="80" height="10" />
    <rect x="10.77" y="109.83" rx="0" ry="0" width="80" height="10" />
    <rect x="7.77" y="128.83" rx="0" ry="0" width="181" height="48" />
    <rect x="261.77" y="130.83" rx="0" ry="0" width="121.27" height="57" />
  </ContentLoader>
)

const styles = {
  card: {
    minWidth: 275,
    marginTop: 15
  },
  pos: {
    marginBottom: 12,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  real: {
    fontSize: '19px'
  }
}

const OperacaoReview = props => {
  const { classes, card, futureBalance, disabled } = props

  if (!card) return loader

  const { name, cellphone, balance } = card
  const getColorForTypo = color => (disabled ? 'textSecondary' : color)
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <div style={{ borderRight: '1px solid #ccc', paddingRight: '10px', width: '60%' }}>
          <div>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              donx
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              color={getColorForTypo('primary')}
            >
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
            <Typography
              variant="subtitle1"
              component="h2"
              color={getColorForTypo('textSecondary')}
            >
              {cellphone}
            </Typography>
          </div>
        </div>
        <div>
          <div>
            <Typography
              className={classes.title}
              color={getColorForTypo('textSecondary')}
              align="right"
              gutterBottom
            >
              saldo atual
            </Typography>
            <Typography
              variant="h6"
              className={classes.real}
              component={RealSpan}
              color={getColorForTypo('secondary')}
              align="right"
              noWrap
            >
              {balance}
            </Typography>
          </div>
          <div style={{ paddingTop: 10 }}>
            <Typography
              className={classes.title}
              color={getColorForTypo('textSecondary')}
              align="right"
              gutterBottom
            >
              saldo futuro
            </Typography>
            <Typography
              variant="h6"
              className={classes.real}
              component={RealSpan}
              color={futureBalance < 0 ? 'error' : getColorForTypo('primary')}
              align="right"
              noWrap
            >
              {futureBalance > 0 ? futureBalance : 0}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

OperacaoReview.propTypes = {
  classes: PropTypes.object.isRequired,
  card: PropTypes.object,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  futureBalance: PropTypes.number,
}

export default withAnimation(withStyles(styles)(OperacaoReview))
