import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseAnon } from "../supabase";

export default defineTool({
  name: "submit_rsvp",
  title: "Submit an RSVP",
  description: "Submit an RSVP for the wedding with the number of guests attending (1-10).",
  inputSchema: {
    guest_count: z.number().int().min(1).max(10).describe("Number of guests attending."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ guest_count }) => {
    const supabase = supabaseAnon();
    const { data, error } = await supabase
      .from("rsvps")
      .insert({ guest_count })
      .select("id, guest_count, created_at")
      .single();

    if (error) return { content: [{ type: "text", text: error.message }], isError: true };

    return {
      content: [{ type: "text", text: `RSVP recorded for ${guest_count} guest(s).` }],
      structuredContent: { rsvp: data },
    };
  },
});
