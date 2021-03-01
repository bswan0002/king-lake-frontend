import React, { useEffect } from "react";
import { Container } from "react-bootstrap";

const Orders = (props) => {
  useEffect(() => {
    props.checkRole("admin");
  });

  return (
    <Container className="mt-4">
      <h2>Orders</h2>
    </Container>
  );
};

export default Orders;
