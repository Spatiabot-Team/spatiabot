import {PassportStrategy} from '@nestjs/passport';
import {config} from 'dotenv';

import {Injectable} from '@nestjs/common';
import {DiscordUserService} from "./discord-user.service";

const Strategy = require('passport-discord').Strategy;

config();

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {

    constructor(
        private discordService: DiscordUserService
    ) {
        super({
            clientID: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_SECRET,
            callbackURL: process.env.DISCORD_CALLBACK,
            scope: process.env.DISCORD_SCOPE.split(','),
        });
    }


    async validate(accessToken: string, refreshToken: string, profile: any, done: any): Promise<any> {
        const socialDiscord = await this.discordService.createOrUpdateSocialDiscord(profile);
        await this.discordService.createOrUpdateDiscordGuilds(socialDiscord,profile);
        done(null, {socialDiscord});
    }
}



