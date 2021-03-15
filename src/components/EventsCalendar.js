import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal, Button, Form, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const EventsCalendar = (props) => {
  const [show, setShow] = useState(false);

  const [formInputs, setFormInputs] = useState({
    "id": -1,
    "title": "",
    "description": "",
  });

  const [startDate, setStartDate] = useState(new Date());
  const [formDate, setFormDate] = useState(new Date());

  const handleDateChange = (date) => {
    console.log(date);
    let splitDate = date.toString().split(" ");
    let newDate = `${splitDate[0]}, ${splitDate[2]} ${splitDate[1]} ${splitDate[3]}`;
    setFormDate(newDate);
    setStartDate(date);
  };

  const handleSubmit = (e) => {
    console.log(e);
  };

  const handleShow = () => setShow(true);

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

  const handleChange = (e) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e) => {
    const thisEventData = props.eventsData.find(
      (event) => event.id === e.resource
    );
    console.log(thisEventData);
    setFormInputs({
      "id": e.resource,
      "title": thisEventData.title,
      "description": thisEventData.description,
    });
    let datePlusOne = new Date(thisEventData.date);
    datePlusOne.setDate(datePlusOne.getDate() + 1);
    setStartDate(Date.parse(datePlusOne));
    if (props.isAdmin) {
      setShow(true);
    }
  };

  const editModal = () => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
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
                  onChange={(date) => handleDateChange(date)}
                  minDate={new Date()}
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
              Delete Event
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  };
  return (
    <div>
      {props.isAdmin && editModal()}
      <Calendar
        localizer={localizer}
        events={props.myEventsList}
        startAccessor="start"
        endAccessor="end"
        popup={true}
        views={["month"]}
        style={{ height: "750px" }}
        onSelectEvent={handleSelect}
      />
    </div>
  );
};

export default EventsCalendar;
