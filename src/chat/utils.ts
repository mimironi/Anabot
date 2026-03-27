import { ChatMessage } from "prismarine-chat";

declare module "prismarine-chat" {
  interface ChatMessage {
    text: string;
    color: string | undefined;
    with: ChatMessage[] | undefined;
    unsigned: ChatMessage | undefined;
  }
}

const color_to_motd: Record<string, string> = {
  undefined: "",
  black: "§0",
  dark_blue: "§1",
  dark_green: "§2",
  dark_aqua: "§3",
  dark_red: "§4",
  dark_purple: "§5",
  gold: "§6",
  gray: "§7",
  dark_gray: "§8",
  blue: "§9",
  green: "§a",
  aqua: "§b",
  red: "§c",
  light_purple: "§d",
  yellow: "§e",
  white: "§f",
};

export function chatMessageToMotd(chatmsg: ChatMessage): string {
  let str = color_to_motd["" + chatmsg.color] + chatmsg.text;
  if (chatmsg.extra !== undefined) {
    for (const extra of chatmsg.extra) {
      str += chatMessageToMotd(extra);
    }
  }
  return str;
}
