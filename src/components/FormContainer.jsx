/**
 * Project: AnimalShelter
 * File: components/FormContainer.jsx
 * Author: Jarrale Butts
 * Created: 2024-08-20
 * Purpose: Provides a styled container for form elements.
 */

import PropTypes from 'prop-types'
import { Container, Row, Col } from 'react-bootstrap'

// A container component to center and style form elements
export function FormContainer({ children }) {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
}
