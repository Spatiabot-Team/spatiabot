import {GetUserByDiscordIdHandler} from "./get-user-by-discord-id.handler";
import {FindRoleHandler} from "./find-role.handler";
import {FindUserByUsernameHandler} from "./find-user-by-username.handler";
import {GetUserByIdHandler} from "./get-user-by-id.handler";

export const QueryHandlersUser = [
    FindRoleHandler,
    FindUserByUsernameHandler,
    GetUserByDiscordIdHandler,
    GetUserByIdHandler
];
