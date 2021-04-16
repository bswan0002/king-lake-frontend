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

  const colWidth = () => {
    return member ? 3 : 4
  }

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
        {member && <Col xs={colWidth()}>{member}</Col>}
        <Col xs={colWidth()}>{`${handleDate(date)}`}</Col>
        <Col xs={colWidth()}>
          {pickup_date && `${handleDate(pickup_date)}`}
        </Col>
        <Col xs={colWidth() -1} className="d-flex mt-2">
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
