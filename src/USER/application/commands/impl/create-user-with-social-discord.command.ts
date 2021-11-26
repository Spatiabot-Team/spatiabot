import {SocialDiscordInterface} from "../../../domain/interfaces/social-discord.interface";

export class CreateUserWithSocialDiscordCommand {

    socialDiscord: SocialDiscordInterface;

    constructor(socialDiscord: SocialDiscordInterface) {
        this.socialDiscord = socialDiscord;
    }
}
