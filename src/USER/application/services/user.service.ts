import {JwtService} from '@nestjs/jwt';
import {UserInterface} from "../../domain/interfaces/user.interface";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UserService {

    constructor(
        private jwtService: JwtService
    ) {
    }

    generateToken(user: UserInterface) {
        const roles = user.roles && user.roles.length > 0 ? user.roles.map(r => r.label) : [];

        let userClear = {
            roles,
            id: user.id,
            username: user.username,
            preferences: user.preferences,
            socialDiscord: null
        };
        const payload: any = {
            username: user.username,
            id: user.id,
            sub: user.id,
            preferences: user.preferences,
            roles,
            socialDiscord: null
        };

        if (user.socialDiscord) {
            payload.socialDiscord = {
                id: user.socialDiscord.id,
                discordId: user.socialDiscord.discordId,
                accessToken: user.socialDiscord.accessToken
            };
            userClear.socialDiscord = {
                discordId: user.socialDiscord.discordId,
                avatar: user.socialDiscord.avatar
            };
        }

        if (user.socialGoogle) {
            payload.socialGoogle = {googleId: user.socialGoogle.googleId}
        }

        return {
            token: this.jwtService.sign(payload),
            user: userClear
        };
    }
}
