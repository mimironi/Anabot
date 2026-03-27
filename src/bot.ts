import * as mineflayer from "mineflayer";
import { setupChat } from "./chat/chat";
import { ChatEvent } from "./chat/chatEvent";
import TypedEmitter from "typed-emitter";
import { EventEmitter } from "node:events";

export default class Anabot extends (EventEmitter as new () => TypedEmitter<ChatEvent>) {
  bot: mineflayer.Bot;

  constructor(bot: mineflayer.Bot, password: string) {
    super();
    this.bot = bot;
    setupChat(this);

    this.bot.once("spawn", () => bot.chat("/login " + password));
  }
}
