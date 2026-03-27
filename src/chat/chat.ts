import { eventMessageFromString } from "./chatEvent";
import { chatMessageToMotd } from "./utils";
import Anabot from "../bot";

export function setupChat(bot: Anabot) {
  bot.bot.on("message", (chatmsg, position) => {
    let motd: string;
    if (position === "chat") {
      motd = chatMessageToMotd(chatmsg.unsigned!.with![0]!);
    } else {
      motd = chatmsg.toMotd();
    }

    const eventMsg = eventMessageFromString(motd);
    if (eventMsg == null) {
      return;
    }
    bot.emit(eventMsg.event, eventMsg.msg);
  });
}
