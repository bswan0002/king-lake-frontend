import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import EventsCalendar from "./EventsCalendar";
import CreateEventModal from "./CreateEventModal";

const Events = (props) => {
  const [events, setEvents] = useState([]);

  // Calendar adds things one day too early
  const addDay = (date) => {
    const correctDayNum = parseInt(date.split("-")[2]) + 1;
    const correctDay = ("0" + correctDayNum).slice(-2);
    return `${date.split("-")[0]}-${date.split("-")[1]}-${correctDay}`;
  };

  const fetchEvents = () => {
    fetch("http://localhost:3000/api/v1/events", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((eventsData) => {
        setEvents(eventsData);
      });
  };

  useEffect(fetchEvents, []);

  const eventsToCalEvents = () => {
    if (events.length > 0) {
      return events.map((event) => {
        return {
          title: event.title,
          start: addDay(event.date),
          end: addDay(event.date),
          allDay: false,
          resource: event.id,
        };
      });
    } else {
      return [{}];
    }
  };

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-between">
          <h2 className="mt-4">Events</h2>
          {props.admin && <CreateEventModal fetchEvents={fetchEvents} />}
        </Col>
      </Row>
      <EventsCalendar myEventsList={eventsToCalEvents()} />
    </Container>
  );
};

export default Events;
