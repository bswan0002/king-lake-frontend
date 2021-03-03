import React, { useContext } from "react";
import {
  Accordion,
  useAccordionToggle,
  AccordionContext,
  Card,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp } from "@fortawesome/free-solid-svg-icons";

function ContextAwareToggle({ children, eventKey, callback }) {
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <Card.Header
      style={{ backgroundColor: isCurrentEventKey ? "pink" : "lavender" }}
      onClick={decoratedOnClick}
    >
      Click Me
    </Card.Header>
  );
}

const Transactions = (props) => {
  return (
    <div>
      <h2>Transactions</h2>
      {/* <FontAwesomeIcon icon={faSortUp} /> */}
      <Accordion defaultActiveKey="0">
        <Card>
          <ContextAwareToggle eventKey="1" />
          <Accordion.Collapse eventKey="1">
            <Card.Body>Hello! I'm the body</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <ContextAwareToggle eventKey="2" />
          <Accordion.Collapse eventKey="2">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

export default Transactions;
