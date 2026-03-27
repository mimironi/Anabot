import { ChatEvent } from "./chatEvent";

export interface ChatEventRule {
  event: keyof ChatEvent;
  color: boolean;
  match: RegExp;
}

export const rules: ChatEventRule[] = [
  {
    event: "chat",
    color: false,
    match: /^(?<team>.*?)◈(?<name>.*): (?<text>.*)/,
  },
  {
    event: "whisper",
    color: false,
    match: /^✉⬇ MSG \((?<name>.*(?= ➺ )).+\) (?<text>.*)/,
  },
  {
    event: "team",
    color: true,
    match: /^§b\[Team\]§f \*\*§f(?<name>.*)§f: §f(?<text>.*)/,
  },
  {
    event: "ally",
    color: false,
    match: /^\[(?<team>.*)\] \*\*(?<name>.*): (?<text>.*)/,
  },
  { event: "system", color: false, match: /(?<text>.*)/ },
];
