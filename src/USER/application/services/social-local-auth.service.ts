// import {Injectable} from '@nestjs/common';
// import {UsersService} from './users.service';
// import {JwtService} from '@nestjs/jwt';
//
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {SocialLocalRepository} from "../../infrastructure/database/repositories/social-local.repository";
import {UserInterface} from "../../domain/interfaces/user.interface";
import {EncrDecrService} from "./enc-decr.service";

@Injectable()
export class SocialLocalAuthService {
    constructor(
        @InjectRepository(SocialLocalRepository) public readonly socialLocalRepository: SocialLocalRepository,
        private encrDecrService: EncrDecrService
    ) {
    }

    /**
     *
     * @param username
     * @param pass
     */
    async validateUser(username: string, pass: string): Promise<UserInterface | undefined> {

        const socialLocal = await this.socialLocalRepository.findByUsername(username);
        if (socialLocal && socialLocal.password === this.encrDecrService.encrypt(process.env.salt,pass)) {
            const {password, ...result} = socialLocal;
            return socialLocal.user;
        }
        return undefined;
    }
}
