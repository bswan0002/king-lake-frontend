import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = (props) => {
  return (
    <footer className="footer">
      <Container>
        <Row className="d-flex justify-content-center">
          <h2 className="mt-4 foot-title">King Lake Cellars Members</h2>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
