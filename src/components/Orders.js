import React from "react";
import { Container } from "react-bootstrap";
import AdminOrders from "./order_components/AdminOrders";
import MemberOrders from "./order_components/MemberOrders";

const Orders = (props) => {
  return (
    <Container className="mt-4">
      {props.role === "admin" && <AdminOrders orders={props.orders} />}
      {props.role === "member" && (
        <MemberOrders
          wines={props.wines}
          fetchUserByToken={props.fetchUserByToken}
        />
      )}
    </Container>
  );
};

export default Orders;
