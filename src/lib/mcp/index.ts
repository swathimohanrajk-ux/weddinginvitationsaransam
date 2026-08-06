import { defineMcp } from "@lovable.dev/mcp-js";
import getWeddingDetails from "./tools/get-wedding-details";
import listGuestWishes from "./tools/list-guest-wishes";
import postGuestWish from "./tools/post-guest-wish";
import submitRsvp from "./tools/submit-rsvp";
import getRsvpSummary from "./tools/get-rsvp-summary";

export default defineMcp({
  name: "everlasting-vows",
  title: "Everlasting Vows",
  version: "0.1.0",
  instructions:
    "Tools for the Saran & Samyuktha wedding invitation site. Use `get_wedding_details` for the date, venue and ceremony schedule, `list_guest_wishes` / `post_guest_wish` for public guest blessings, and `submit_rsvp` / `get_rsvp_summary` for attendance.",
  tools: [getWeddingDetails, listGuestWishes, postGuestWish, submitRsvp, getRsvpSummary],
});
