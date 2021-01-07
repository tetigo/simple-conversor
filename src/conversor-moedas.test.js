import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import ConversorMoedas from './conversor-moedas';
import '@testing-library/jest-dom/extend-expect';

//o jest vai procurar por convenção a pasta __mocks__ e vai procurar pelo objeto axios
//usando o objeto falso ao invés de fazer a importacao do axios verdadeiro
import axiosMock from 'axios'

describe('teste do componente de conversão de moedas', () => {

  it('deve renderizar o componente sem erros', () => {
    let div = document.createElement('div');
    ReactDOM.render(<ConversorMoedas />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('deve simular uma conversão de moedas', async () => {
    //findByTestId ao inves de getByTestId porque permite assincronismo
    const { findByTestId, getByTestId } = render(<ConversorMoedas />)
    //ele retorna o objeto informado aki
    axiosMock.get.mockResolvedValueOnce({
      data: { success: true, rates: { BRL: 3.40, USD: 1 } }
    })
    //simular o click e converter
    fireEvent.click(getByTestId('btn-converter'))
    const modal = await findByTestId('modal.body')
    expect(axiosMock.get).toHaveBeenCalledTimes(1)
    expect(modal).toHaveTextContent('1 USD = 3.40 BRL')
    1
  })

})
