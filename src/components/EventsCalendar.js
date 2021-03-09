import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const EventsCalendar = (props) => (
  <div>
    <Calendar
      localizer={localizer}
      events={props.myEventsList}
      startAccessor="start"
      endAccessor="end"
      popup={true}
      views={["month"]}
      style={{ height: "750px" }}
    />
  </div>
);

export default EventsCalendar;
