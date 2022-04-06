import {CreateUserWithSocialDiscordHandler} from "./create-user-with-social-discord.handler";
import {CreateUserWithSocialLocalHandler} from "./create-user-with-social-local.handler";
import {CreateRoleHandler} from "./create-role.handler";

export const CommandHandlersUser = [
    CreateUserWithSocialDiscordHandler,
    CreateUserWithSocialLocalHandler,
    CreateRoleHandler
];
