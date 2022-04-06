import {PassportStrategy} from '@nestjs/passport';
import {config} from 'dotenv';

import {Injectable} from '@nestjs/common';
import {SocialDiscordService} from "../../../application/services/social-discord.service";

const Strategy = require('passport-discord').Strategy;

config();

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {

    constructor(
        private socialDiscordService: SocialDiscordService
    ) {
        super({
            clientID: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_SECRET,
            callbackURL: process.env.DISCORD_REDIRECT_URI,
            scope: process.env.DISCORD_SCOPE.split(','),
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: any): Promise<any> {
        const socialDiscord = this.socialDiscordService.adaptPasseportProfilDiscordToSocialDiscord(profile);
        done(null, {accessToken, refreshToken, socialDiscord});
    }

}



