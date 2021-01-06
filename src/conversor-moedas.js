import './conversor-moedas.css';
import {
  Jumbotron, Button, Form, Col, Spinner, Alert, Modal
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

function ConversorMoedas() {
  return (
    <div>
      <h3>Conversor de Moedas</h3>
      <Alert variant="danger" show={true}>
        ERro obtendo dados de conversão. Tente novamente.
      </Alert>
      <Jumbotron>
        <Form>
          <Form.Row>
            <Col sm='3'>
              <Form.Control placeholder="0" value={1} required>

              </Form.Control>
            </Col>

            <Col sm='3'>
              <Form.Control as="select">

              </Form.Control>
            </Col>

            <Col sm='1' className="text-center" style={{ paddingTop: '5px' }}>
              <FontAwesomeIcon icon={faAngleDoubleRight}></FontAwesomeIcon>
            </Col>

            <Col sm='3'>
              <Form.Control as="select">

              </Form.Control>

            </Col>

            <Col sm='2'>
              <Button variant="success" type="submit"><Spinner animation="border" size="sm"></Spinner>Converter</Button>
            </Col>

          </Form.Row>
        </Form>
        <Modal show={false}>
          <Modal.Header closeButton>
            <Modal.Title>Conversão</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Resultado da Conversão Aqui
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success">Nova conversão</Button>
          </Modal.Footer>
        </Modal>
      </Jumbotron>
    </div>
  );
}

export default ConversorMoedas;
