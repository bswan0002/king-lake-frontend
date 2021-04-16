import { Row, Col } from "react-bootstrap";

const OrderHeader = ( { hasMember }) => {
  const headerStyles = {
    color: "#4c79cc",
    fontSize: "1.25em"
  }

  const paddingStyles = {
    padding: "0px 20px"
  }

  const colWidth = () => {
    return hasMember ? 3 : 4
  }

  return (
    <div>
      <Row style={paddingStyles}>
        {hasMember && <Col xs={colWidth()}><h3 style={headerStyles}>Member</h3></Col>}
        <Col xs={colWidth()}><h3 style={headerStyles}>Order Date</h3></Col>
        <Col xs={colWidth()}><h3 style={headerStyles}>Pickup Date</h3></Col>
        <Col xs={3}><h3 style={headerStyles}>Status</h3></Col>
      </Row>
    </div>
  )
}

export default OrderHeader;