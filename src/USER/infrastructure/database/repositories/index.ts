import {SocialDiscordRepository} from "./social-discord.repository";
import {UserRepository} from "./user.repository";
import {SocialLocalRepository} from "./social-local.repository";
import {RoleRepository} from "./role.repository";

export const repositoriesUser = [
    SocialLocalRepository,
    SocialDiscordRepository,
    UserRepository,
    RoleRepository
]
