import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router-dom'

const styles = {
  card: {
    minWidth: 275,
    marginTop: 10
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}

function Home(props) {
  const { user: { roles, name}, history } = props

  const getOptionsForRoles = roles => {
    const options = [
      {
        title: 'Cadastrar Cartão',
        subtitle:
          'É necessário o número do cartão, o nome e celular do titular, e o saldo inicial.',
        path: 'cadastro',
        role: 'c',
      },
      {
        title: 'Vender',
        subtitle: 'Para lojinha ou lanchonete. Tenha cuidado e digite com atenção!',
        path: 'venda',
        role: 'v',
      },
      {
        title: 'Recarregar',
        subtitle:
          'Você deve receber dinheiro do usuário e adicionar crédito no seu cartão.',
        path: 'recarga',
        role: 'u',
      },
      {
        title: 'Consultar Saldo',
        subtitle:
          'Você só vai precisar do número do cartão e das duas letras iniciais do nome do portador.',
        path: 'consulta',
        role: 'r',
      },
      {
        title: 'Finalizar Cartão',
        subtitle:
          'Você precisará do número do cartão, e deverá devolver o valor restante do saldo para o portador.',
        path: 'finalizacao',
        role: 'f',
      },
      {
        title: 'Administração',
        subtitle:
          'Você poderá autorizar usuários e ver estatísticas sobre o evento.',
        path: 'admin',
        role: 'a'
      }
    ]
    return options
      .filter(({ role }) => roles.includes(role))
      .map(({ title, subtitle, path }, key) => (
        <Card className="pointer mt2 w5-ns" key={key} onClick={() => {history.push(path)}}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {title}
            </Typography>
            <Typography component="p">{subtitle}</Typography>
          </CardContent>
        </Card>
      ))
  }
  
  const firstName = name.split[' '][0]

  return (
    <div>
      <Typography variant="h5" align="center" className="pt4-l">
        <span>
          Seja bem-vindo, <span className="b">{firstName}</span>
        </span>
      </Typography>
      <Typography variant="subtitle1" align="center">
        Veja o que você pode fazer:
      </Typography>
      {getOptionsForRoles(roles)}
    </div>
  )
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  roles: PropTypes.string.isRequired
}

export default withUser(withRouter(withStyles(styles)(Home)))
