import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const styles = {
  card: {
    minWidth: 275,
    marginTop: 10,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}


function Home(props) {
  const { classes } = props

  const getOptionsForRoles = (roles) => {
    const options = [{
      title: 'Vender',
      subtitle: 'Para lojinha ou lanchonete. Tenha cuidado!',
      path: 'app/venda',
      role: 'v'
    },
    {
      title: 'Recarregar',
      subtitle: 'Você deve receber dinheiro do usuário e adicionar crédito no seu cartão',
      path: 'app/venda',
      role: 'u'
    },{
      title: 'Cadastrar Cartão',
      subtitle: 'É necessário o número do cartão, o nome e celular do titular, e o saldo inicial.',
      path: 'app/cadastro',
      role: 'c'
    },
    {
      title: 'Consultar Saldo',
      subtitle: 'Você só precisar do número do seu cartão e das duas letras iniciais de quem o cadastrou.',
      path: 'app/consulta',
      role: 'r'
    }
  ]
  return options.map(({ title, subtitle}, key) => (
    <Card className="pointer mt2 w5-ns" key={key}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <Typography component="p">
            {subtitle}
          </Typography>
        </CardContent>
      </Card>
  ))
  }
  return (
    <div>
      <Typography variant="h5" align="center" className="pt4-l">
        Seja bem-vindo
      </Typography>
      <Typography variant="subtitle1" align="center">
        Veja o que você pode fazer
      </Typography>
      {getOptionsForRoles()}
    </div>
  )
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home)
