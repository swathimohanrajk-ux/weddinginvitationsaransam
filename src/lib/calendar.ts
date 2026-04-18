// Wedding event details (single source of truth)
export const WEDDING_EVENT = {
  title: "Saran & Sammyuktha — Wedding",
  description:
    "Together with families, we joyfully invite you to celebrate the wedding of Saran & Sammyuktha. Venue: Suguna Auditorium, Sitra. Map: https://maps.app.goo.gl/MPNAbGj9Dv4uHpUC8",
  location: "Suguna Auditorium, Sitra",
  // Local IST: Sep 12, 2026 10:00 AM → 01:00 PM (UTC = IST - 5:30)
  startUtc: "20260912T043000Z",
  endUtc: "20260912T073000Z",
  mapUrl: "https://maps.app.goo.gl/MPNAbGj9Dv4uHpUC8",
};

const enc = encodeURIComponent;

export const googleCalendarUrl = () => {
  const e = WEDDING_EVENT;
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${enc(
    e.title,
  )}&dates=${e.startUtc}/${e.endUtc}&details=${enc(e.description)}&location=${enc(e.location)}`;
};

export const outlookCalendarUrl = () => {
  const e = WEDDING_EVENT;
  // Outlook web requires ISO with offset
  const toIso = (s: string) =>
    `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}T${s.slice(9, 11)}:${s.slice(11, 13)}:${s.slice(13, 15)}+00:00`;
  return `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${enc(
    e.title,
  )}&startdt=${enc(toIso(e.startUtc))}&enddt=${enc(toIso(e.endUtc))}&body=${enc(e.description)}&location=${enc(e.location)}`;
};

export const downloadIcs = () => {
  const e = WEDDING_EVENT;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@wedding`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTSTART:${e.startUtc}`,
    `DTEND:${e.endUtc}`,
    `SUMMARY:${e.title}`,
    `DESCRIPTION:${e.description.replace(/\n/g, "\\n")}`,
    `LOCATION:${e.location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "saran-sammyuktha-wedding.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
