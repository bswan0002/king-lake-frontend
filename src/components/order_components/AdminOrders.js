import React, { useState, useEffect } from "react";
import {
  Accordion,
  Card,
  Row,
  Col,
  ListGroup,
  Form,
  Button,
} from "react-bootstrap";
import CustomScrollDiv from "../utilities/CustomScrollDiv";
import ContextAwareToggle from "./ContextAwareToggle";

const AdminOrders = (props) => {
  const [orders, setOrders] = useState(false);
  const [completed, setCompleted] = useState({});

  const fetchOrders = () => {
    fetch("http://localhost:3000/api/v1/orders")
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

  useEffect(fetchOrders, []);

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

  const handleChange = (e) => {
    let index = orders.findIndex((order) => order.id === parseInt(e.target.id));
    let newOrders = [...orders];
    newOrders[index][e.target.name] = e.target.checked;
    setOrders(newOrders);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let index = orders.findIndex((order) => order.id === parseInt(e.target.id));

    fetch(`http://localhost:3000/api/v1/orders/${orders[index].id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
      },
      body: JSON.stringify(orders[index]),
    })
      .then((res) => res.json())
      .then((order) =>
        setCompleted(() => {
          if (order.prepared && order.paid_for && order.picked_up) {
            return { ...completed, [order.id]: true };
          } else {
            return { ...completed, [order.id]: false };
          }
        })
      );
  };

  const nameById = (id) => {
    if (props.userData) {
      let thisUser = props.userData.find((user) => user.db.id === id);
      return `${thisUser.square.given_name} ${thisUser.square.family_name}`;
    } else {
      return `Finding user from Square...`;
    }
  };

  const sortOrders = () => {
    return (
      orders && orders.sort((a, b) => (a.created_at < b.created_at ? -1 : 1))
    );
  };

  const renderOrderCards = (status) => {
    let currentKey = 0;
    return (
      orders &&
      sortOrders().map((order) => {
        if (
          (status === "pending" && !completed[order.id]) ||
          (status === "completed" && completed[order.id])
        ) {
          currentKey += 1;
          return (
            <Card>
              <ContextAwareToggle
                eventKey={`${currentKey}`}
                member={nameById(order.user_id)}
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
                      <Form onSubmit={handleSubmit} id={order.id}>
                        <Form.Check
                          className="mt-2"
                          id={order.id}
                          label="Prepared"
                          name="prepared"
                          checked={order.prepared}
                          onChange={handleChange}
                        />
                        <Form.Check
                          className="mt-2"
                          id={order.id}
                          label="Paid for"
                          name="paid_for"
                          checked={order.paid_for}
                          onChange={handleChange}
                        />
                        <Form.Check
                          className="mt-2"
                          id={order.id}
                          label="Picked up"
                          name="picked_up"
                          checked={order.picked_up}
                          onChange={handleChange}
                        />
                        <Button size="sm" type="submit">
                          Save Status
                        </Button>
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
          <Accordion style={{ maxHeight: "400px" }}>
            {" "}
            {renderOrderCards("pending")}
          </Accordion>
        </CustomScrollDiv>
      ) : (
        <h3>Retrieving Orders...</h3>
      )}

      <hr />
      <h2 className="mb-3">Completed Orders</h2>
      {orders ? (
        <CustomScrollDiv>
          <Accordion style={{ maxHeight: "400px" }}>
            {" "}
            {renderOrderCards("completed")}
          </Accordion>
        </CustomScrollDiv>
      ) : null}
    </div>
  );
};

export default AdminOrders;
