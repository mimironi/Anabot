import * as mineflayer from "mineflayer";
import Anabot from "./bot";
import readline from "readline";
import { loadConfig } from "./configLoader";

const configs = loadConfig();

const firstConfig = configs[0];
if (!firstConfig) {
    throw new Error("No bot configurations found in config.json");
}

let anabot = new Anabot(
    mineflayer.createBot(firstConfig.botOptions),
    firstConfig.server_password,
);

anabot.on("chat", (msg) => {
    console.log(`${msg.team} ${msg.name}: ${msg.text}`);
});

anabot.on("whisper", (msg) => {
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
