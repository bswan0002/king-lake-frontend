import React, { useState, useEffect, useContext, Fragment } from "react";
import {
  Accordion,
  Card,
  Row,
  Col,
  useAccordionToggle,
  AccordionContext,
  Form,
  Button,
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
  const [creatingCommitAdjustment, setCreatingCommitAdjustment] = useState(
    false
  );

  const [formInputs, setFormInputs] = useState({
    "credit": 0,
    "note": "",
  });

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

  const handleChange = (e) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormInputs({
      "credit": 0,
      "note": "",
    });
    setCreatingCommitAdjustment(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/v1/commit-adjustments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formInputs,
        "adjustment": parseInt(formInputs.credit),
        "user_id": props.member_id,
      }),
    }).then(resetForm());
  };

  const commitAdjustmentForm = () => {
    return (
      <Fragment>
        <h2>New Commit Adjustment</h2>
        <hr />
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Col xs={1}>
              <Form.Label className="mt-1">Credit:</Form.Label>
            </Col>
            <Col xs={3}>
              <Form.Control
                value={formInputs.credit}
                name="credit"
                onChange={handleChange}
              ></Form.Control>
            </Col>
          </Form.Row>
          <Form.Row className="mt-2">
            <Col xs={1}>
              <Form.Label className="mt-1">Note:</Form.Label>
            </Col>
            <Col xs="11">
              <Form.Control
                as="textarea"
                value={formInputs.note}
                name="note"
                onChange={handleChange}
              ></Form.Control>
            </Col>
          </Form.Row>
          <Form.Row className="mt-1">
            <Col xs="1" />
            <Col className="d-flex justify-content-between">
              <Button type="submit">Submit</Button>
              <Button className="btn btn-secondary" onClick={resetForm}>
                Discard
              </Button>
            </Col>
          </Form.Row>
        </Form>
        <hr />
      </Fragment>
    );
  };

  return (
    <div>
      {creatingCommitAdjustment && commitAdjustmentForm()}
      <Row>
        <Col className="d-flex justify-content-between">
          <h2 className="mt-3">Commit Adjustments</h2>
          {!creatingCommitAdjustment && (
            <Button
              className="mt-2"
              onClick={() => setCreatingCommitAdjustment(true)}
            >
              Create Commit Adjustment
            </Button>
          )}
        </Col>
      </Row>

      {props.commitAdjustments ? (
        <div className="mt-4">
          <CustomScrollDiv>
            <Accordion className="order-accordion-list">
              {renderCommitAdjustmentCards()}
            </Accordion>
          </CustomScrollDiv>
        </div>
      ) : (
        <h3 className="mt-3">Retrieving Commit Adjustments...</h3>
      )}
    </div>
  );
};

export default CommitAdjustments;
