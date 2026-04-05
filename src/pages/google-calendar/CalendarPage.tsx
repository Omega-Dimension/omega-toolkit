import { useEffect } from "react";
import { useAppSelector } from "../../store/hooks";

export default function CalendarPage() {
  const accessToken = useAppSelector((state) => state.googleAuth.accessToken);

  async function getCalendarEvents() {
    const token = accessToken;

    if (!token) return { error: "No access token found" };

    try {
      const response = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      return data.items; // This returns the array of events
    } catch (error) {
      console.error("Error fetching calendar:", error);
    }
  }

  useEffect(() => {
    getCalendarEvents();
  }, []);
  return <div>fwefwefwe</div>;
}
