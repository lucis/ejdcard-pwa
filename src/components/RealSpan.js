import React from 'react'

const RealSpan = ({children, ...other}) => {
  const paraReal = (cents) => {
    let valor = String(Number(cents))
    if (valor.length == 2) valor = '0' + valor;
    if (valor.length == 1) valor = '00' + valor;
    return 'R$ ' + valor.slice(0,valor.length-2) + ',' + valor.slice(valor.length-2,valor.length)
  }
  return <span {...other}>{paraReal(children)}</span>
}

export default RealSpan