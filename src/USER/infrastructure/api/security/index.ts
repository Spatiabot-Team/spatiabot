import {LocalAuthGuard} from "./local-auth.guard";
import {LocalStrategy} from "./local.strategy";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {JwtStrategy} from "./jwt.strategy";
import {DiscordStrategy} from "./discord.strategy";

export const Security = [
    LocalStrategy,
    LocalAuthGuard,
    JwtStrategy,
    JwtAuthGuard,
    DiscordStrategy
];
