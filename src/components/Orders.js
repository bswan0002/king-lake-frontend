import React, { useEffect } from "react";
import { Container } from "react-bootstrap";

const Orders = (props) => {
  const fetchCustomerGroups = () => {
    fetch("http://localhost:3000/api/v1/customer-groups")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    props.checkRole("admin");
    fetchCustomerGroups();
  });

  return (
    <Container className="mt-4">
      <h2>Orders</h2>
    </Container>
  );
};

export default Orders;
