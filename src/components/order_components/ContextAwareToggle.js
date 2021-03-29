// Libraries
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
import { faCircle } from "@fortawesome/free-solid-svg-icons";
// Components
import handleDate from "../utilities/handleDate";

function ContextAwareToggle({
  eventKey,
  callback,
  member,
  date,
  pickup_date,
  prepared,
  paid_for,
  picked_up,
}) {
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = currentEventKey === eventKey;

  const statusIcon = (classArg) => {
    return (
      <div className="mx-1">
        <FontAwesomeIcon icon={faCircle} className={classArg} />
      </div>
    );
  };
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
        <Col xs={3}>{`${handleDate(date)}`}</Col>
        <Col xs={3}>
          For pickup on: {pickup_date && `${handleDate(pickup_date)}`}
        </Col>
        <Col xs={2} className="d-flex mt-2">
          {prepared && statusIcon("prepared")}
          {paid_for && statusIcon("paid_for")}
          {picked_up && statusIcon("picked_up")}
        </Col>
        <Col xs={1} style={{ textAlign: "right" }}>
          <FontAwesomeIcon icon={isCurrentEventKey ? faSortUp : faSortDown} />
        </Col>
      </Row>
    </Card.Header>
  );
}

export default ContextAwareToggle;
