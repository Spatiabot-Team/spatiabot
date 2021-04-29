import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import {DiscordUserService} from "../discord/discord-user.service";
import {GoogleService} from "./google.service";

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(
        private googleService: GoogleService
    ) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK,
            scope: process.env.GOOGLE_SCOPE.split(',') || '',
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: any): Promise<any> {
        const socialGoogle = await this.googleService.createOrUpdateSocialGoogle(profile);
        done(null, {socialGoogle});
    }
}
