import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import RealSpan from './RealSpan'
import ContentLoader from 'react-content-loader'

const loader = (<ContentLoader 
  height={200}
  width={400}
  speed={2}
  primaryColor="#f3f3f3"
  secondaryColor="#ecebeb"
  style={{padding: 5, height: '100%'}}
>
  <rect x="7.77" y="15.83" rx="0" ry="0" width="80" height="10" /> 
  <rect x="6.77" y="33.83" rx="0" ry="0" width="181" height="30" /> 
  <rect x="299.77" y="13.83" rx="0" ry="0" width="80" height="10" /> 
  <rect x="263.77" y="34.83" rx="0" ry="0" width="121.27" height="57" /> 
  <rect x="303.77" y="108.83" rx="0" ry="0" width="80" height="10" /> 
  <rect x="10.77" y="109.83" rx="0" ry="0" width="80" height="10" /> 
  <rect x="7.77" y="128.83" rx="0" ry="0" width="181" height="48" /> 
  <rect x="261.77" y="130.83" rx="0" ry="0" width="121.27" height="57" />
</ContentLoader>)

const styles = {
  card: {
    minWidth: 275,
  },
  pos: {
    marginBottom: 12,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}

OperacaoReview.propTypes = {
  classes: PropTypes.object.isRequired,
  card: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  futureBalance: PropTypes.number,
}

const OperacaoReview = props => {
  const { classes, card: { name, cellphone, balance}, futureBalance, loading, disabled } = props

  const getColorForTypo = (color) => disabled ? 'textSecondary' : color
  return (
    <Card className={classes.card}>
      {loading && loader}
      {!loading && <CardContent className={classes.cardContent}>
        <div style={{ borderRight: '1px solid #ccc', paddingRight: '10px' }}>
          <div>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              dono
            </Typography>
            <Typography variant="h6" component="h2" color={getColorForTypo('primary')}>
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
            <Typography variant="subtitle1" component="h2" color={getColorForTypo('textSecondary')}>
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
              component={RealSpan}
              color={getColorForTypo('primary')}
              align="right"
              noWrap
            >
              {futureBalance}
            </Typography>
          </div>
        </div>
      </CardContent>}
    </Card>
  )
}

export default withStyles(styles)(OperacaoReview)
