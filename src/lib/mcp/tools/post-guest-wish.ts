import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseAnon } from "../supabase";

export default defineTool({
  name: "post_guest_wish",
  title: "Post a guest wish",
  description: "Post a short public wish or blessing for the couple on the wedding invitation site.",
  inputSchema: {
    guest_name: z.string().trim().min(1).max(80).describe("Name of the guest posting the wish."),
    message: z.string().trim().min(1).max(500).describe("The wish message."),
    is_anonymous: z
      .boolean()
      .default(false)
      .describe("When true, the wish is shown as posted by 'Anonymous Guest'."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ guest_name, message, is_anonymous }) => {
    const supabase = supabaseAnon();
    const { data, error } = await supabase
      .from("guest_wishes")
      .insert({ guest_name, message, is_anonymous: is_anonymous ?? false })
      .select("id, guest_name, message, is_anonymous, created_at")
      .single();

    if (error) return { content: [{ type: "text", text: error.message }], isError: true };

    return {
      content: [{ type: "text", text: `Wish posted: ${JSON.stringify(data)}` }],
      structuredContent: { wish: data },
    };
  },
});
