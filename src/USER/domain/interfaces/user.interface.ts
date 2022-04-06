import {RoleInterface} from "./role.interface";
import {SocialDiscordInterface} from "./social-discord.interface";
import {SocialGoogle} from "../entities/social-google";
import {SocialGoogleInterface} from "./social-google.interface";

export interface UserInterface {

    id?: string;
    username?: string;
    avatar?: string;
    roles?: RoleInterface[];
    preferences?: any[];
    socialDiscord? : SocialDiscordInterface;
    socialGoogle? : SocialGoogleInterface;
}
