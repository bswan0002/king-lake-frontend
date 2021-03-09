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
import HandleDate from "../order_components/HandleDate";

function ContextAwareToggle({ eventKey, callback, bottles, date }) {
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
        <Col xs={5}>{`${bottles} ${
          bottles > 1 ? "Bottles" : "Bottle"
        } Purchased on:`}</Col>
        <Col>
          <HandleDate date={date} />
        </Col>
        <Col style={{ textAlign: "right" }}>
          <FontAwesomeIcon icon={isCurrentEventKey ? faSortUp : faSortDown} />
        </Col>
      </Row>
    </Card.Header>
  );
}

const Transactions = (props) => {
  const renderWineList = (items) => {
    return items.map((item) => {
      return (
        <ListGroup.Item>
          <Row>
            <Col xs={10}>{item.name}</Col>
            <Col>x{item.quantity}</Col>
          </Row>
        </ListGroup.Item>
      );
    });
  };
  const renderTransactionCards = () => {
    let currentKey = 0;
    return props.thisUserData?.transactions?.map((transaction) => {
      const bottleTotal = transaction.line_items?.reduce((total, line_item) => {
        return total + parseInt(line_item.quantity);
      }, 0);
      bottleTotal && (currentKey += 1);
      return (
        bottleTotal && (
          <Card key={currentKey}>
            <ContextAwareToggle
              eventKey={`${currentKey}`}
              bottles={bottleTotal}
              date={transaction.created_at}
            />
            <Accordion.Collapse eventKey={`${currentKey}`}>
              <Card.Body>{renderWineList(transaction.line_items)}</Card.Body>
            </Accordion.Collapse>
          </Card>
        )
      );
    });
  };

  return props.thisUserData ? (
    <div className="accordion-list">
      <h2 className="mb-3">Transactions</h2>
      <CustomScrollDiv>
        <Accordion className="transaction-accordion-list" defaultActiveKey="0">
          {renderTransactionCards()}
        </Accordion>
      </CustomScrollDiv>
    </div>
  ) : (
    <h2>Loading...</h2>
  );
};

export default Transactions;
