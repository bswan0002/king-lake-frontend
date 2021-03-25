// Libraries
import React from "react";
import { Container } from "react-bootstrap";
// Components
import AdminOrders from "./order_components/AdminOrders";
import MemberOrders from "./order_components/MemberOrders";

const Orders = (props) => {
  return (
    <Container className="mt-4">
      {props.role === "admin" && <AdminOrders userData={props.userData} />}
      {props.role === "member" && (
        <MemberOrders
          wines={props.wines}
          fetchUserByToken={props.fetchUserByToken}
          membershipLevel={props.membershipLevel}
        />
      )}
    </Container>
  );
};

export default Orders;
