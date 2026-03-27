import { Message } from "./message";
import { rules } from "./chatEventRule";

export type ChatEvent = {
  system: (msg: Message) => void;
  whisper: (msg: Message) => void;
  chat: (msg: Message) => void;
  team: (msg: Message) => void;
  ally: (msg: Message) => void;
};

export interface EventMessage {
  event: keyof ChatEvent;
  msg: Message;
}

export function eventMessageFromString(str: string): EventMessage | null {
  for (const eventMatch of rules) {
    const matchGroups = (eventMatch.color ? str : str.replace(/§./g, "")).match(
      eventMatch.match,
    )?.groups!;
    if (matchGroups != null) {
      return {
        event: eventMatch.event,
        msg: matchGroups as unknown as Message,
      };
    }
  }
  return null;
}
