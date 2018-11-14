import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import RealSpan from './RealSpan'
import success from "./success.png";

const styles = {
  card: {
    minWidth: 275,
    maxWidth: 300
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column"
  },
  real: {
    fontSize: "19px"
  }
};

const Resumo = ({ classes, card: { name, cellphone, balance}, operation: { type, code, amount }}) => {
    const getTitleForOp = () => {
        switch (type) {
            case 'c':
                return 'Novo Cartão'
            case 'v':
                return 'Venda'
            case 'u':
                return 'Recarga'
            case 'f':
                return 'Finalização'
            default:
                return 'Erro'
        }
    }
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <img src={success} alt="" width={40} height={40} />
          <div>
            <Typography variant="h4" color="primary">
              Sucesso!
            </Typography>
          </div>
        </div>
        <Typography
          style={{
            textTransform: "uppercase",
            backgroundColor: "#ccc",
            marginTop: 10,
            fontSize: 11
          }}
          variant="subtitle2"
          color="textSecondary"
          align="center"
        >
          {getTitleForOp()}
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10
          }}
        >
          <div
            style={{
              borderRight: "1px solid #ccc",
              paddingRight: "10px",
              width: "60%"
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
              <Typography variant="h6" component="h2" color={"primary"}>
                {name}
              </Typography>
            </div>
            <div style={{ paddingTop: 10 }}>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {['cf'].includes(type) ? 'celular' : 'valor da operação'}
              </Typography>
              <Typography variant="subtitle1" component="h2" color="secondary">
              {['cf'].includes(type) ? cellphone : amount}
              </Typography>
            </div>
          </div>
          <div>
            <div>
              <Typography
                className={classes.title}
                color='textSecondary'
                align="right"
                gutterBottom
              >
                cartão
              </Typography>
              <Typography
                variant="h6"
                className={classes.real}
                component="h2"
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
                color='textSecondary'
                align="right"
                gutterBottom
              >
                {type == 'f' ? 'último saldo' : 'saldo atual'}
              </Typography>
              <Typography
                variant="h6"
                className={classes.real}
                component={RealSpan}
                color={futureBalance < 0 ? "error" : 'primary'}
                align="right"
                noWrap
              >
                {balance}
              </Typography>
            </div>
          </div>
        </div>
        <Typography
          style={{
            backgroundColor: "#eee",
           color: '#aaa',
            marginTop: 10,
            fontSize: 11
          }}
          variant="subtitle2"
          color="textSecondary"
          align="center"
        >
          {`Código da Operação: ${code}`}
        </Typography>
      </CardContent>
    </Card>
  );
}

Resumo.propTypes = {
  classes: PropTypes.object.isRequired,
  card: PropTypes.object,
  operation: PropTypes.object
};

export default withStyles(styles)(Resumo);
