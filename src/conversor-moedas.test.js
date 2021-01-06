import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import ConversorMoedas from './conversor-moedas';

describe('suite de teste', () => {

  test('deve renderizar o componente sem erros', () => {
    let div = document.createElement('div');
    ReactDOM.render(<ConversorMoedas />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

})
