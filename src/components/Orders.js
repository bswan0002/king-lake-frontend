import React from "react";
import { Container } from "react-bootstrap";
import AdminOrders from "./order_components/AdminOrders";
import MemberOrders from "./order_components/MemberOrders";

const Orders = (props) => {
  return (
    <Container className="mt-4">
      {props.role === "admin" && <AdminOrders />}
      {props.role === "member" && <MemberOrders wines={props.wines} />}
    </Container>
  );
};

export default Orders;
