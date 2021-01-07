import axios from 'axios'
import React, { useState } from 'react';
import './conversor-moedas.css';
import {
  Jumbotron, Button, Form, Col, Spinner, Alert, Modal
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import ListaMoedas from './lista-moedas';
import FIXER_URL_TOKEN from './config';

function ConversorMoedas() {
  const FIXER_URL = `http://data.fixer.io/api/latest?access_key=${FIXER_URL_TOKEN}&format=1`
  const [valor, setValor] = useState(1)
  const [moedaDe, setMoedaDe] = useState('USD')
  const [moedaPara, setMoedaPara] = useState('BRL')
  const [exibeSpinner, setExibeSpinner] = useState(false)
  const [formValidado, setFormValidado] = useState(false)
  const [exibeModal, setExibeModal] = useState(false)
  const [resultadoConversao, setResultadoConversao] = useState('')
  const [exibeErroMsg, setExibeErroMsg] = useState(false)


  function handleValor(event) {
    setValor(event.target.value.replace(/\D/g, ''))
  }

  function handleMoedaDe(event) {
    setMoedaDe(event.target.value)
  }

  function handleMoedaPara(event) {
    setMoedaPara(event.target.value)
  }

  function handleFecharModal(event) {
    setValor(1)
    setMoedaDe('USD')
    setMoedaPara('BRL')
    setFormValidado(false)
    setExibeSpinner(false)
    setExibeModal(false)
  }

  function obterCotacao(dadosCotacao) {
    if (!dadosCotacao || dadosCotacao.success !== true) {
      return false;
    }
    const cotacaoDe = dadosCotacao.rates[moedaDe];
    const cotacaoPara = dadosCotacao.rates[moedaPara];
    //euro como base na api
    const cotacao = (1 / cotacaoDe * cotacaoPara) * valor;
    return cotacao.toFixed(2);
  }

  function converter(event) {
    event.preventDefault()
    setFormValidado(true)
    if (event.currentTarget.checkValidity() === true) {
      setExibeSpinner(true)
      axios.get(FIXER_URL)
        .then(res => {
          const cotacao = obterCotacao(res.data)
          if (!cotacao) {
            throw new Error()
          }
          setResultadoConversao(`${valor} ${moedaDe} = ${cotacao} ${moedaPara}`)
          setExibeModal(true)
          setExibeSpinner(false)
          setExibeErroMsg(false)
        })
        .catch(err => exibeErro())

    }
  }

  function exibeErro() {
    setExibeErroMsg(true)
    setExibeSpinner(false)
  }

  return (
    <div>
      <h3>Conversor de Moedas</h3>
      <Alert variant="danger" show={exibeErroMsg}>
        Erro obtendo dados de conversão. Tente novamente.
      </Alert>
      <Jumbotron>
        <Form onSubmit={converter} noValidate validated={formValidado}>
          <Form.Row>
            <Col sm='3'>
              <Form.Control
                placeholder="0"
                value={valor}
                onChange={handleValor}
                required>
              </Form.Control>
            </Col>

            <Col sm='3'>
              <Form.Control as="select"
                value={moedaDe}
                onChange={handleMoedaDe}>
                <ListaMoedas />
              </Form.Control>
            </Col>

            <Col sm='1' className="text-center" style={{ paddingTop: '5px' }}>
              <FontAwesomeIcon icon={faAngleDoubleRight}></FontAwesomeIcon>
            </Col>

            <Col sm='3'>
              <Form.Control as="select"
                value={moedaPara}
                onChange={handleMoedaPara}>
                <ListaMoedas />
              </Form.Control>

            </Col>

            <Col sm='2'>
              <Button data-testid="btn-converter" variant="success" type="submit" onClick={() => setExibeSpinner(!exibeSpinner)}>
                <span className={exibeSpinner ? null : 'hidden'}>
                  <Spinner animation="border" size="sm"></Spinner>
                </span>
                <span className={exibeSpinner ? 'hidden' : null}>
                  Converter
                </span>
              </Button>
            </Col>

          </Form.Row>
        </Form>
        <Modal show={exibeModal} onHide={handleFecharModal} data-testid="modal">
          <Modal.Header closeButton>
            <Modal.Title>Conversão</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: "center" }} data-testid="modal.body">
            {resultadoConversao}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleFecharModal}>Nova conversão</Button>
          </Modal.Footer>
        </Modal>
      </Jumbotron>
    </div>
  );
}

export default ConversorMoedas;
