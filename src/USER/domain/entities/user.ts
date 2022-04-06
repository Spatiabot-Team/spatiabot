import {UserInterface} from "../interfaces/user.interface";
import {SocialLocalInterface} from "../interfaces/social-local.interface";
import {SocialDiscordInterface} from "../interfaces/social-discord.interface";

export class User implements UserInterface {
    id?: string;
    username?: string;
    avatar?: string;
    socialDiscord?: SocialDiscordInterface;
    socialLocal?: SocialLocalInterface;
    preferences ?: any;
}
