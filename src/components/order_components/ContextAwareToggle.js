import React, { useContext } from "react";
import {
  useAccordionToggle,
  AccordionContext,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import HandleDate from "./HandleDate";

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
        <Col xs={3}>{`${member} Ordered on:`}</Col>
        <Col xs={3}>
          <HandleDate date={date} />
        </Col>
        <Col xs={3}>
          For pickup on: {pickup_date && <HandleDate date={pickup_date} />}
        </Col>
        <Col xs={3} style={{ textAlign: "right" }}>
          <FontAwesomeIcon icon={isCurrentEventKey ? faSortUp : faSortDown} />
        </Col>
      </Row>
    </Card.Header>
  );
}

export default ContextAwareToggle;
