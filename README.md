## EJD Card

Sistema integrado de pagamentos para evento interno. Feito para o Encontrão EJD da cidade de Campina Grande - PB
![EJDCard](https://i.imgur.com/vfn607N.png)

## Autorização
Após a autenticação de um usuário, o **admin** consegue alocar papéis para este usuário, o que irá determinar a quais seções da aplicação este terá acesso.

É possível atribuir papéis através das letras que os representam, escrevendo uma string na configuração de cada usuário. Exemplo: ao adicionar`vu` como papéis de um certo usuário, este poderá fazer vendas e recargas.

|Papel| Significado |
|--|--|
| `v` | Usuário pode fazer vendas com qualquer cartão |
| `u` | Usuário pode fazer recargas de cartão  |
| `c` | Usuário pode cadastrar cartões (e setar saldo inicial) |
| `r` | Usuário pode ler o saldo de algum cartão (automaticamente todos usuários que logam têm esse papel) |
| `a` | Usuário é administrador, pode alterar permissões de outros usuários |

## Desenvolvendo
- Você precisar **criar uma app Firebase** e configurar as credenciais no arquivo `withRoot.js`.
- Após isso, rode `yarn start` e tudo deve funcionar.
- Logue com seu provedor (Google ou Facebook), e, no banco, adicione o papel `vucra` no usuário que foi criado para você
