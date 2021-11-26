import {UserInterface} from "../../domain/interfaces/user.interface";
import {SocialDiscordInterface} from "../../domain/interfaces/social-discord.interface";
import {SocialDiscord} from "../../domain/entities/social-discord";

export interface SocialDiscordRepositoryInterface {
    createSocialDiscord(socialDiscord : SocialDiscordInterface) : Promise<SocialDiscordInterface>;
    findUserByDiscordId(discordId : string) : Promise<UserInterface | undefined>;
}
