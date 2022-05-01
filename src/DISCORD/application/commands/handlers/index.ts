import {DiscordGuildCreateHandler} from "./discord-guild/discord-guild.create.handler";
import {DiscordGuildFindOrCreateHandler} from "./discord-guild/discord-guild.find-or-create.handler";
import {DiscordGuildUserCreateHandler} from "./discord-guild-user/discord-guild-user.create.handler";
import {DiscordGuildUserResetHandler} from "./discord-guild-user/discord-guild-user.reset.handler";
import {AnswerInChannelHandler} from "./answer-in-channel.handler";
import {ChannelWriteToUserHandler} from "./channel/channel.write-to-user.handler";

export const CommandHandlers = [
    // Discord-guild
    DiscordGuildCreateHandler,
    DiscordGuildFindOrCreateHandler,

    // Discord-guild-user
    DiscordGuildUserCreateHandler,
    DiscordGuildUserResetHandler,

    AnswerInChannelHandler,

    // Channel
    ChannelWriteToUserHandler
];
