import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  // Get the current year for displaying in the footer
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

export default Footer;