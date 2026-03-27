import * as mineflayer from "mineflayer";
import Anabot from "./bot";
import readline from "readline";
import config from "../config.json";

let anabot = new Anabot(
  mineflayer.createBot({
    username: config.username,
    host: config.host,
    auth: "offline",
  }),
  config.password,
);

anabot.on("chat", (msg) => {
  console.log(`${msg.team} ${msg.name}: ${msg.text}`);
});

anabot.on("whisper", (msg) => {
  if (msg.name !== "Danion") {
    return;
  }
  console.log(`${msg.name} whisper: ${msg.text}`);
  anabot.bot.chat(msg.text);
});

anabot.on("team", (msg) => {
  console.log(`team ${msg.name}: ${msg.text}`);
});

anabot.on("ally", (msg) => {
  console.log(`ally ${msg.team} ${msg.name}: ${msg.text}`);
});

anabot.on("system", (msg) => {
  console.log(msg.text);
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on("line", (input) => {
  anabot.bot.chat(input);
});
