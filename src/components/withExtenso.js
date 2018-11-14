import React from 'react'
import numero from 'numero-por-extenso'

export default (WrappedComponent) => {
    return (props) => {
        const capitalize = text => {
            return text
              .toLowerCase()
              .split(' ')
              .map(s =>
                s.length == 1 ? s : s.charAt(0).toUpperCase() + s.substring(1)
              )
              .join(' ')
          }
        const centavosParaExtenso = cents => capitalize(numero.porExtenso(cents / 100, numero.estilo.monetario))
        return <WrappedComponent {...props} centavosParaExtenso={centavosParaExtenso}/>
    }
}