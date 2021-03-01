import React, { useEffect } from "react";
import { Container } from "react-bootstrap";

const Emails = (props) => {
  useEffect(() => {
    props.checkRole("admin");
  });
  return (
    <Container className="mt-4">
      <h2>Emails</h2>
    </Container>
  );
};

export default Emails;
