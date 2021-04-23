// Libraries
import { Accordion, Card, Row, Col, ListGroup, Form } from "react-bootstrap";
// Components
import CustomScrollDiv from "../utilities/CustomScrollDiv";
import ContextAwareToggle from "./ContextAwareToggle";
import Legend from "./Legend";
import OrderHeader from "./OrderHeader";

const OrderList = ({ orders, completed }) => {
  const anyCompleted = () => {
    return Object.values(completed).some((val) => !!val);
  };

  const anyPending = () => {
    return Object.values(completed).some((val) => !val);
  }

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
            <Card key={order.id}>
              <ContextAwareToggle
                eventKey={`${currentKey}`}
                member=""
                date={order.created_at}
                pickup_date={order.pickup_date}
                prepared={order.prepared}
                paid_for={order.paid_for}
                picked_up={order.picked_up}
              />
              <Accordion.Collapse eventKey={`${currentKey}`}>
                <Card.Body>
                  <Row>
                    <Col>
                      <h6>Wine</h6>
                    </Col>
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
        } else {
          return null;
        }
      })
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h2>Pending Orders</h2>
        <div className="mt-2">
          <Legend />
        </div>
      </div>

      {anyPending() && (
        <>
          <OrderHeader hasMember={false} />
          <CustomScrollDiv>
            <Accordion className="order-accordion-list">
              {" "}
              {renderOrderCards("pending")}
            </Accordion>
          </CustomScrollDiv>
        </>
      )}

      <hr />
      <h2>Completed Orders</h2>
      {anyCompleted() && (
        <>
          <OrderHeader hasMember={false} />
          <CustomScrollDiv>
            <Accordion className="order-accordion-list">
              {" "}
              {renderOrderCards("completed")}
            </Accordion>
          </CustomScrollDiv>
        </>
      )}
    </div>
  );
};

export default OrderList;
