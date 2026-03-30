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
    mc_password: string;
    server_password: string;
};

type RawConfig = {
    host: string;
    port: number;
    bots: RawBotConfig[];
};

const AUTH_VALUES = new Set<Auth>(["offline", "microsoft", "mojang"]);

function isAuth(value: unknown): value is Auth {
    return typeof value === "string" && AUTH_VALUES.has(value as Auth);
}

function toRawConfig(input: typeof rawConfig): RawConfig {

    if (!input.host) {
        throw new Error("Missing host in config.json");
    }

    if (!input.bots) {
        throw new Error("Missing bots in config.json");
    }

    return {
        host: input.host,
        port: input.port,
        bots: input.bots.map((bot): RawBotConfig => {
            if (!isAuth(bot.auth)) {
                throw new Error(`Invalid auth value: ${bot.auth}`);
            }

            if (!bot.username) {
                throw new Error("Missing username in bot config");
            }

            if (bot.auth !== "offline" && !bot.mc_password) {
                throw new Error("Missing mc_password in bot config");
            }

            if (!bot.server_password) {
                throw new Error("Missing server_password in bot config");
            }

            return {
                auth: bot.auth,
                username: bot.username,
                mc_password: bot.mc_password,
                server_password: bot.server_password,
            };
        }),
    };
}

export function loadConfig(): Config[] {
    const config = toRawConfig(rawConfig);

    return config.bots.map((bot) => {
        const botOptions: BotOptions = {
            host: config.host,
            port: config.port,
            auth: bot.auth,
            username: bot.username,
            password: bot.mc_password
        };

        return {
            botOptions,
            server_password: bot.server_password,
        };
    });
}
