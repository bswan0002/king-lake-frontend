import React, { useContext } from "react";
import {
  Accordion,
  useAccordionToggle,
  AccordionContext,
  Card,
  Row,
  Col,
  ListGroup,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import CustomScrollDiv from "../utilities/CustomScrollDiv";

function ContextAwareToggle({ eventKey, callback, member, date, pickup_date }) {
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <Card.Header
      style={{
        backgroundColor: isCurrentEventKey
          ? "pink"
          : eventKey % 2 === 1
          ? "#f2f2f2"
          : "#cdcdcd",
      }}
      onClick={decoratedOnClick}
    >
      <Row>
        <Col>{`${member} Ordered on:`}</Col>
        <Col>{date}</Col>
        <Col>{`for pickup on ${pickup_date}`}</Col>
        <Col xs={1} style={{ textAlign: "right" }}>
          <FontAwesomeIcon icon={isCurrentEventKey ? faSortUp : faSortDown} />
        </Col>
      </Row>
    </Card.Header>
  );
}

const AdminOrders = (props) => {
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

  const renderOrderCards = () => {
    let currentKey = 0;
    return props.orders?.map((order) => {
      console.log(order);
      currentKey += 1;
      return (
        <Card>
          <ContextAwareToggle
            eventKey={`${currentKey}`}
            member={order.user_id}
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
                <Col>Status Check Boxes</Col>
              </Row>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      );
    });
  };
  return (
    <div>
      <h2 className="mb-3">Pending Orders</h2>
      <CustomScrollDiv>
        <Accordion> {renderOrderCards()}</Accordion>
      </CustomScrollDiv>
      <hr />
      <h2>Completed Orders</h2>
    </div>
  );
};

export default AdminOrders;
