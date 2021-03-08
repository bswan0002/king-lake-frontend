import React, { useState, useEffect } from "react";
import { Accordion, Card, Row, Col, ListGroup, Form } from "react-bootstrap";
import CustomScrollDiv from "../utilities/CustomScrollDiv";
import ContextAwareToggle from "./ContextAwareToggle";

const MemberOrderList = (props) => {
  const [orders, setOrders] = useState(false);
  const [completed, setCompleted] = useState({});

  useEffect(() => {
    props.fetchUserByToken().then((user) => fetchOrders(user.id));
  }, [props.fetchAgain]);

  const fetchOrders = (id) => {
    fetch(`http://localhost:3000/api/v1/orders/${id}`)
      .then((res) => res.json())
      .then((orderRes) => {
        setOrders(orderRes);
        setCompleted(() => {
          let completedOrders = {};
          orderRes.forEach((order) => {
            if (order.prepared && order.paid_for && order.picked_up) {
              completedOrders[order.id] = true;
            } else {
              completedOrders[order.id] = false;
            }
          });
          return completedOrders;
        });
      });
  };
  const renderWineList = (items) => {
    return items.map((item) => {
      return (
        <ListGroup.Item>
          <Row>
            <Col xs={10}>{item.wine}</Col>
            <Col>x{item.quantity}</Col>
          </Row>
        </ListGroup.Item>
      );
    });
  };

  const renderOrderCards = (status) => {
    let currentKey = 0;
    return (
      orders &&
      orders.map((order) => {
        if (
          (status === "pending" && !completed[order.id]) ||
          (status === "completed" && completed[order.id])
        ) {
          currentKey += 1;
          return (
            <Card>
              <ContextAwareToggle
                eventKey={`${currentKey}`}
                member=""
                date={order.created_at}
                pickup_date={order.pickup_date}
              />
              <Accordion.Collapse eventKey={`${currentKey}`}>
                <Card.Body>
                  <Row>
                    <Col>Wine</Col>
                    <Col>Status</Col>
                  </Row>
                  <Row>
                    <Col>
                      <ListGroup>{renderWineList(order.items)}</ListGroup>
                    </Col>
                    <Col>
                      <Form id={order.id}>
                        <Form.Check
                          disabled
                          className="mt-2"
                          id={order.id}
                          label="Prepared"
                          name="prepared"
                          checked={order.prepared}
                        />
                        <Form.Check
                          disabled
                          className="mt-2"
                          id={order.id}
                          label="Paid for"
                          name="paid_for"
                          checked={order.paid_for}
                        />
                        <Form.Check
                          disabled
                          className="mt-2"
                          id={order.id}
                          label="Picked up"
                          name="picked_up"
                          checked={order.picked_up}
                        />
                      </Form>
                    </Col>
                  </Row>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          );
        }
      })
    );
  };

  return (
    <div>
      <h2 className="mb-3">Pending Orders</h2>
      {orders ? (
        <CustomScrollDiv>
          <Accordion className="order-accordion-list">
            {" "}
            {renderOrderCards("pending")}
          </Accordion>
        </CustomScrollDiv>
      ) : (
        <h3>Retrieving Orders...</h3>
      )}

      <hr />
      <h2>Completed Orders</h2>
      {orders ? (
        <CustomScrollDiv>
          <Accordion className="order-accordion-list">
            {" "}
            {renderOrderCards("completed")}
          </Accordion>
        </CustomScrollDiv>
      ) : null}
    </div>
  );
};

export default MemberOrderList;
