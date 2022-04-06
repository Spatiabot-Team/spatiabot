import {UserInterface} from "./user.interface";

export interface SocialDiscordInterface {
    id?: string;
    discordId?: string;
    username?: string;
    email?: string;
    avatar?: string;
    avatarFullLink?: string;
    accessToken?: string;
    user?:UserInterface;
}
