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
    MC_HOST: string;
    MC_PORT: number;
    MC_VERSION: string;
    MC_BOTS: RawBotConfig[];
};

const AUTH_VALUES = new Set<Auth>(["offline", "microsoft", "mojang"]);

function isAuth(value: unknown): value is Auth {
    return typeof value === "string" && AUTH_VALUES.has(value as Auth);
}

function toRawConfig(input: typeof rawConfig): RawConfig {
    return {
        MC_HOST: input.MC_HOST,
        MC_PORT: input.MC_PORT,
        MC_VERSION: input.MC_VERSION,
        MC_BOTS: input.MC_BOTS.map((bot): RawBotConfig => {
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

const config = toRawConfig(rawConfig);

export function loadConfig(): BotConfig[] {
    return config.MC_BOTS.map((bot) => {
        const botOptions: BotOptions = {
            host: config.MC_HOST,
            port: config.MC_PORT,
            version: config.MC_VERSION,
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