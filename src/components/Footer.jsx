/**
 * Project: AnimalShelter
 * File: components/Footer.jsx
 * Author: Jarrale Butts
 * Created: 2024-08-20
 * Purpose: Responsible for rendering the footer of the application.
 */

import { Container, Row, Col } from 'react-bootstrap'

// Footer component
export function Footer() {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <p>Pet Rescue Shelter &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
