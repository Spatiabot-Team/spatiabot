import { JwtService } from '@nestjs/jwt';
import {UserInterface} from "../../domain/interfaces/user.interface";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UserService {

    constructor(
        private jwtService: JwtService
    ) {
    }

    generateToken(user: UserInterface) {
        const payload: any = {
            username: user.username,
            id: user.id,
            sub: user.id,
            preferences: user.preferences,
            roles: user.roles.length > 0 ? user.roles.map(r => r.label) : [],
            socialDiscord: null
        };

        if (user.socialDiscord) {
            payload.socialDiscord = {discordId: user.socialDiscord.discordId}
        }

        if (user.socialGoogle) {
            payload.socialGoogle = {googleId: user.socialGoogle.googleId}
        }

        return {
            token: this.jwtService.sign(payload),
        };
    }
}
