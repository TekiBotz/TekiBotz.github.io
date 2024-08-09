import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

// A container component to center and style form elements
const FormContainer = ({ children }) => {
  return (
    <Container>
        <Row className='justify-content-md-center'>
            <Col xs={12} md={6}>
                { children }
            </Col>
        </Row>
    </Container>
  )
}

export default FormContainer;