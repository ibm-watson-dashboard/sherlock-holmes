import React, { Component } from 'react';
import { Container, Row, Col, Card, CardTitle, CardText, CardSubtitle, CardBody } from 'reactstrap';

import './Welcome.css';

class Welcome extends Component {

    render() {
        return (
          <Container className="welcome-container">
            <Row>
              <Col xs="12" sm="6">.col-6 .col-sm-4</Col>
              <Col sm="6">
                WELCOME
              </Col>
            </Row>
          </Container>
        )
    }
}

export default Welcome;