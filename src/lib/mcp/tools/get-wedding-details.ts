import { defineTool } from "@lovable.dev/mcp-js";

const schedule = [
  {
    title: "Engagement Day",
    date: "12.09.2026",
    weekday: "Saturday",
    events: [
      { name: "Engagement Ceremony (Nichayathartham)", time: "7:30 AM – 9:00 AM" },
      { name: "Exchange of Ceremonial Gifts (Murai Vazhi Seer)", time: "10:30 AM – 1:00 PM" },
      { name: "Muhurtha Kaal (Ceremonial Ritual)", time: "After 5:30 PM" },
      { name: "Reception", time: "After 6:00 PM" },
    ],
  },
  {
    title: "Wedding Day",
    date: "13.09.2026",
    weekday: "Sunday",
    events: [
      { name: "Wedding Muhurtham", time: "Between 6:30 AM and 7:30 AM" },
      { name: "Wedding Lunch (Sambandhi Virundhu)", time: "After 12:00 PM" },
    ],
  },
];

const details = {
  couple: { bride: "Samyuktha", groom: "Saran" },
  weddingDate: "2026-09-13",
  weddingTime: "6:30 AM (Muhurtham between 6:30 AM and 7:30 AM)",
  venue: {
    name: "Suguna Auditorium",
    area: "Sitra",
    directions: "https://maps.app.goo.gl/MPNAbGj9Dv4uHpUC8",
  },
  schedule,
};

export default defineTool({
  name: "get_wedding_details",
  title: "Get wedding details",
  description:
    "Get the couple's names, wedding date and time, venue with directions link, and the full ceremony schedule.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(details, null, 2) }],
    structuredContent: details,
  }),
});
