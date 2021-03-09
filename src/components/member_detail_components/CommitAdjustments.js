import React, { useState, useEffect, useContext } from "react";
import {
  Accordion,
  Card,
  Row,
  Col,
  useAccordionToggle,
  AccordionContext,
} from "react-bootstrap";
import CustomScrollDiv from "../utilities/CustomScrollDiv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import HandleDate from "../order_components/HandleDate";

function ContextAwareToggle({ eventKey, callback, date }) {
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
        <Col>Adjustment on:</Col>
        <Col>
          <HandleDate date={date} />
        </Col>
        <Col>For Credit/Debit of x</Col>
        <Col xs={1} style={{ textAlign: "right" }}>
          <FontAwesomeIcon icon={isCurrentEventKey ? faSortUp : faSortDown} />
        </Col>
      </Row>
    </Card.Header>
  );
}

const CommitAdjustments = (props) => {
  const renderCommitAdjustmentCards = () => {
    let currentKey = 0;
    return (
      props.commitAdjustments &&
      props.commitAdjustments.map((commitAdjustment) => {
        currentKey += 1;
        return (
          <Card>
            <ContextAwareToggle
              eventKey={`${currentKey}`}
              date={commitAdjustment.created_at}
            />
            <Accordion.Collapse eventKey={`${currentKey}`}>
              <Card.Body>
                <p>{commitAdjustment.note}</p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        );
      })
    );
  };

  return (
    <div>
      <h2 className="mt-3">Commit Adjustments</h2>
      {props.commitAdjustments ? (
        <CustomScrollDiv>
          <Accordion className="order-accordion-list">
            {renderCommitAdjustmentCards()}
          </Accordion>
        </CustomScrollDiv>
      ) : (
        <h3 className="mt-3">Retrieving Commit Adjustments...</h3>
      )}
    </div>
  );
};

export default CommitAdjustments;
