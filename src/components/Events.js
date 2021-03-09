import React from "react";
import { Container, Row } from "react-bootstrap";
import EventsCalendar from "./EventsCalendar";
import CreateEventModal from "./CreateEventModal";

const Events = (props) => {
  const myEventsList = [
    {
      title: `Event Title`,
      start: new Date(),
      end: new Date(),
      allDay: false,
      resource: null,
    },
  ];
  return (
    <Container>
      <Row className="d-flex justify-content-between">
        <h2 className="mt-4">Events</h2>
        {props.admin && <CreateEventModal />}
      </Row>
      <EventsCalendar myEventsList={myEventsList} />
    </Container>
  );
};

export default Events;
