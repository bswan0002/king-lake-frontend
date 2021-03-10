import React, { useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateEventModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    resetFormInputs();
  };

  const resetFormInputs = () => {
    setFormInputs({
      "title": "",
      "description": "",
    });
    setStartDate(new Date());
  };

  const handleShow = () => setShow(true);

  const [startDate, setStartDate] = useState(new Date());

  const [formInputs, setFormInputs] = useState({
    "title": "",
    "description": "",
  });

  const handleChange = (e) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitting");
    fetch("http://localhost:3000/api/v1/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formInputs,
        date: startDate,
      }),
    }).then(handleClose());
  };

  return (
    <div className="mt-4">
      <Button variant="primary" size="md" onClick={handleShow}>
        Create Event
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Event</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
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
                <Form.Control
                  className="h-38"
                  name="title"
                  value={formInputs.title}
                  onChange={handleChange}
                ></Form.Control>
              </Col>
              <Col>
                <DatePicker
                  className="h-38"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </Col>
            </Form.Row>
            <Form.Row className="mt-2">
              <Col>
                <Form.Label>Event Description</Form.Label>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formInputs.description}
                  onChange={handleChange}
                ></Form.Control>
              </Col>
            </Form.Row>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Discard Event
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateEventModal;
