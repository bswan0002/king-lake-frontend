import React, { useState } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateEventModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="mt-4">
      <Button variant="primary" size="md" onClick={handleShow}>
        Create Event
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Row>
              <Col>
                <Form.Label>Event Title</Form.Label>
              </Col>
              <Col>
                <Form.Label>Event Date</Form.Label>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Control className="h-229"></Form.Control>
              </Col>
              <Col>
                <DatePicker
                  className="h-229"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </Col>
            </Form.Row>
            <Form.Row className="mt-2">
              <Form.Label>Event Description</Form.Label>
            </Form.Row>
            <Form.Row>
              <Form.Control as="textarea" rows={3}></Form.Control>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Discard Event
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateEventModal;
