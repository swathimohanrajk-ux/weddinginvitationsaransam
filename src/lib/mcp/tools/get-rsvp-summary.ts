import { defineTool } from "@lovable.dev/mcp-js";
import { supabaseAnon } from "../supabase";

export default defineTool({
  name: "get_rsvp_summary",
  title: "Get RSVP summary",
  description: "Get the total number of RSVP submissions and the total guests confirmed so far.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async () => {
    const supabase = supabaseAnon();
    const { data, error } = await supabase.from("rsvps").select("guest_count");

    if (error) return { content: [{ type: "text", text: error.message }], isError: true };

    const summary = {
      submissions: data?.length ?? 0,
      total_guests: (data ?? []).reduce((sum, r) => sum + (r.guest_count ?? 0), 0),
    };

    return {
      content: [{ type: "text", text: JSON.stringify(summary) }],
      structuredContent: summary,
    };
  },
});
