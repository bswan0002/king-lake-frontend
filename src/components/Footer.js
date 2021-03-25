import React from "react";
import { Container, Row } from "react-bootstrap";

const Footer = (props) => {
  return (
    <footer className="footer">
      <Container>
        <Row className="d-flex justify-content-center">
          <h2 className="mt-4 foot-title">King Lake Cellars Members</h2>
        </Row>
        <Row className="d-flex justify-content-center">
          <p>© 2020 - 2021 | King Lake Cellars</p>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
