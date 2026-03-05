import { Type, type Static } from "@sinclair/typebox";

const MEMBER_ID_TYPE_VALUES = ["open_id", "user_id", "union_id"] as const;

export const FeishuChatSchema = Type.Union([
  // ── Existing actions ──────────────────────────────────────────────────────
  Type.Object({
    action: Type.Literal("members"),
    chat_id: Type.String({ description: "Chat ID (from URL or event payload)" }),
    page_size: Type.Optional(Type.Number({ description: "Page size (1-100, default 50)" })),
    page_token: Type.Optional(Type.String({ description: "Pagination token" })),
    member_id_type: Type.Optional(
      Type.Unsafe<(typeof MEMBER_ID_TYPE_VALUES)[number]>({
        type: "string",
        enum: [...MEMBER_ID_TYPE_VALUES],
        description: "Member ID type (default: open_id)",
      }),
    ),
  }),
  Type.Object({
    action: Type.Literal("info"),
    chat_id: Type.String({ description: "Chat ID (from URL or event payload)" }),
  }),
  // ── Announcement read actions ─────────────────────────────────────────────
  Type.Object({
    action: Type.Literal("get_announcement"),
    chat_id: Type.String({ description: "Chat ID to get announcement from" }),
  }),
  Type.Object({
    action: Type.Literal("list_announcement_blocks"),
    chat_id: Type.String({ description: "Chat ID to list announcement blocks from" }),
  }),
  Type.Object({
    action: Type.Literal("get_announcement_block"),
    chat_id: Type.String({ description: "Chat ID to get announcement block from" }),
    block_id: Type.String({ description: "Block ID (from list_announcement_blocks)" }),
  }),
  // ── Announcement write actions ────────────────────────────────────────────
  Type.Object({
    action: Type.Literal("write_announcement"),
    chat_id: Type.String({ description: "Chat ID to write announcement to" }),
    content: Type.String({
      description:
        "Content to write. For doc format: replaces the entire announcement. For docx format: appends a new text block under the page root.",
    }),
  }),
  Type.Object({
    action: Type.Literal("append_announcement"),
    chat_id: Type.String({ description: "Chat ID to append announcement to" }),
    content: Type.String({ description: "Markdown content to append to announcement" }),
  }),
  Type.Object({
    action: Type.Literal("update_announcement_block"),
    chat_id: Type.String({ description: "Chat ID to update announcement block in" }),
    block_id: Type.String({ description: "Block ID (from list_announcement_blocks)" }),
    content: Type.String({ description: "New text content" }),
  }),
  // ── Chat management actions ───────────────────────────────────────────────
  Type.Object({
    action: Type.Literal("create_chat"),
    name: Type.String({ description: "Group chat name" }),
    user_ids: Type.Optional(
      Type.Array(Type.String(), { description: "List of user IDs to add to the group" }),
    ),
    description: Type.Optional(Type.String({ description: "Group chat description" })),
  }),
  Type.Object({
    action: Type.Literal("add_members"),
    chat_id: Type.String({ description: "Chat ID to add members to" }),
    user_ids: Type.Array(Type.String(), { description: "List of user IDs to add" }),
  }),
  Type.Object({
    action: Type.Literal("check_bot_in_chat"),
    chat_id: Type.String({ description: "Chat ID to check" }),
  }),
  Type.Object({
    action: Type.Literal("delete_chat"),
    chat_id: Type.String({ description: "Chat ID to delete/dismiss" }),
  }),
  Type.Object({
    action: Type.Literal("create_session_chat"),
    name: Type.String({ description: "Session group name" }),
    user_ids: Type.Array(Type.String(), { description: "List of user IDs to invite" }),
    greeting: Type.Optional(
      Type.String({
        description:
          "Greeting message to send (default: Hello! I've created this group chat for us to collaborate.)",
      }),
    ),
    description: Type.Optional(Type.String({ description: "Group description" })),
  }),
]);

export type FeishuChatParams = Static<typeof FeishuChatSchema>;
