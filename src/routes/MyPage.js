import React from 'react'
import { Container, Card, Row, Col } from 'react-bootstrap';

// permanent data fra en db ville være ideelt her
// men eftersom vi er begrænset vil jeg gemme brugerens wishlist i local storage
// local storage i modsætning til session har egenskaberne at: aldrig udløbe, alle faner

const MyPage = () => {
  return (
    <Container>

      <div>My page</div>
    </Container>
  )
}

export default MyPage