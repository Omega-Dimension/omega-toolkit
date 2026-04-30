// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import { useEffect, useState } from "react";
// import { fetchCalendarEvents } from "../../services/googleCalendarService";
// import { useAppSelector } from "../../store/hooks";

// const CalendarPage = () => {
//   const token = useAppSelector((state) => state.googleAuth.accessToken);
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     if (!token) return;
//     fetchCalendarEvents(token).then((data) => {
//       const formatted = data.items.map((event: any) => ({
//         id: event.id,
//         title: event.summary,
//         start: event.start.dateTime ?? event.start.date,
//         end: event.end?.dateTime ?? event.end?.date,
//       }));
//       setEvents(formatted);
//     });
//   }, [token]);

//   if (!token) return <p>Please sign in with Google to view your calendar.</p>;

//   return (
//     <FullCalendar
//       plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//       initialView="dayGridMonth"
//       headerToolbar={{
//         left: "prev,next today",
//         center: "title",
//         right: "dayGridMonth,timeGridWeek,timeGridDay",
//       }}
//       events={events}
//       height="700px"
//     />
//   );
// };

// export default CalendarPage;