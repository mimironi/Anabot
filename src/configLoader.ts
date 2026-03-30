import { BotOptions } from "mineflayer";
import rawConfig from "../config.json";

type Auth = "offline" | "microsoft" | "mojang";

type BotConfig = {
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
    version: string;
    bots: RawBotConfig[];
};

const AUTH_VALUES = new Set<Auth>(["offline", "microsoft", "mojang"]);

function isAuth(value: unknown): value is Auth {
    return typeof value === "string" && AUTH_VALUES.has(value as Auth);
}

function toRawConfig(input: typeof rawConfig): RawConfig {
    return {
        host: input.host || "localhost",
        port: input.port || 25565,
        version: input.version || "1.21.4",
        bots: input.bots.map((bot): RawBotConfig => {
            if (!isAuth(bot.auth)) {
                throw new Error(`Invalid auth value: ${bot.auth}`);
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

export function loadConfig(): BotConfig[] {
    const config = toRawConfig(rawConfig);

    return config.bots.map((bot) => {
        const botOptions: BotOptions = {
            host: config.host,
            port: config.port,
            version: config.version,
            auth: bot.auth,
            username: bot.username,
            password: bot.mc_password,
        };

        return {
            botOptions,
            server_password: bot.server_password,
        };
    });
}