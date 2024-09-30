/**
 * Project: AnimalRescue
 * File: FormContainer.js
 * Author: Jarrale Butts
 * Created: 2024-09-19
 * Purpose: Container for centering and styling form elements. 
 */

import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container>
        <Row className='justify-content-md-center'>
            <Col xs={12} md={6}>
                { children }  {/* Render any child components passed to FormContainer */}
            </Col>
        </Row>
    </Container>
  )
}

export default FormContainer;