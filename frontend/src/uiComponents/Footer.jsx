/**
 * Project: AnimalRescue
 * File: Footer.jsx
 * Author: Jarrale Butts
 * Created: 2024-09-16
 * Purpose: Displays the footer of the application.
 */

import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  // Current year for copyright information.
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