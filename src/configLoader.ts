import { BotOptions } from "mineflayer";
import rawConfig from "../config.json";

type Auth = "offline" | "microsoft" | "mojang";

type Config = {
    botOptions: BotOptions;
    server_password: string;
};

type RawBotConfig = {
    auth: Auth;
    username: string;
    mc_password?: string;
    server_password: string;
};

type RawConfig = {
    host: string;
    port?: number;
    bots: RawBotConfig[];
};

const AUTH_VALUES = new Set<Auth>(["offline", "microsoft", "mojang"]);

function isAuth(value: unknown): value is Auth {
    return typeof value === "string" && AUTH_VALUES.has(value as Auth);
}

export function loadConfig(): Config[] {
    const config = rawConfig as RawConfig;

    return config.bots.map((bot) => {
        if (!isAuth(bot.auth)) {
            throw new Error(`Invalid auth value: ${bot.auth}`);
        }

        const botOptions: BotOptions = {
            host: config.host,
            auth: bot.auth,
            username: bot.username,
        };
        if (config.port !== undefined) botOptions.port = config.port;
        if (bot.mc_password !== undefined) botOptions.password = bot.mc_password;

        return {
            botOptions,
            server_password: bot.server_password,
        };
    });
}
