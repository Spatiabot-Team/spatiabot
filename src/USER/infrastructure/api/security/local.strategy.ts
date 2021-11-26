import {Strategy} from 'passport-local';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {SocialLocalAuthService} from "../../../application/services/social-local-auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private socialLocalAuthService: SocialLocalAuthService) {
        super();
    }

    /**
     * Retourne le user s'il a été trouvé avec ce username / password
     * Sinon, throw une exception
     * @param username
     * @param password
     */
    async validate(username: string, password: string): Promise<any> {
        const user = await this.socialLocalAuthService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
