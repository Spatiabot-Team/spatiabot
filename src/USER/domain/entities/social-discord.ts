import {SocialDiscordInterface} from "../interfaces/social-discord.interface";

export class SocialDiscord implements SocialDiscordInterface {
    id?: string;
    discordId?: string;
    username?: string;
    email?: string;
    avatar?: string;
    accessToken?: string;
}
