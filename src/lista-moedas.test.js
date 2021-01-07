import React from 'react'
import ReactDOM from 'react-dom'
import ListaMoedas from './lista-moedas'

describe('teste do componente de listagem de moedas', () => {
    it('deve renderizar sem erros', () => {
        let div = document.createElement('div')
        ReactDOM.render(<ListaMoedas />, div)
        ReactDOM.unmountComponentAtNode(div)
    })
})