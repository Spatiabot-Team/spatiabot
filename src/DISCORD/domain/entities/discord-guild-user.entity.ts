import {DiscordGuildUserInterface} from "../interfaces/discord-guild-user.interface";

export class DiscordGuildUser implements DiscordGuildUserInterface {

    id?: string;
    permissions?: string;
    isOwner?: boolean;
    socialDiscordId?:string;
}
