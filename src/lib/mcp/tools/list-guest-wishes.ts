import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseAnon } from "../supabase";

export default defineTool({
  name: "list_guest_wishes",
  title: "List guest wishes",
  description: "List the public guest wishes posted on the wedding invitation site, newest first.",
  inputSchema: {
    limit: z.number().int().min(1).max(100).default(20).describe("How many wishes to return."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }) => {
    const supabase = supabaseAnon();
    const { data, error } = await supabase
      .from("guest_wishes")
      .select("id, guest_name, message, is_anonymous, created_at")
      .order("created_at", { ascending: false })
      .limit(limit ?? 20);

    if (error) return { content: [{ type: "text", text: error.message }], isError: true };

    const wishes = (data ?? []).map((w) => ({
      id: w.id,
      name: w.is_anonymous ? "Anonymous Guest" : w.guest_name,
      message: w.message,
      created_at: w.created_at,
    }));

    return {
      content: [{ type: "text", text: JSON.stringify(wishes, null, 2) }],
      structuredContent: { wishes },
    };
  },
});
