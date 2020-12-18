import {Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "../../database/repository/user.repository";
import {UserDto} from "../../database/dto/user.dto";
import {User} from "../../database/entity/user.entity";
import {RoleRepository} from "../../database/repository/role.repository";
import {EncrDecrService} from "./enc-decr.service";

@Injectable()
export class UsersService {
    //
    constructor(
        @InjectRepository(UserRepository) public readonly userRepository: UserRepository,
        @InjectRepository(RoleRepository) private readonly roleRepository: RoleRepository,
        private jwtService: JwtService,
        private encrDecrService: EncrDecrService,
    ) {
    }

    async validateUser(username, password): Promise<User | null> {//: Promise<UserDto> {

        //avoid empty passwords as ex google account
        if (password.length <= 3) {
            return null;
        }

        const passwordCrypted = this.encrDecrService.encrypt(process.env.salt, password);
        const user = await this.userRepository.findBySocialAuth(username, passwordCrypted);
        return user || null;
    }

    generateToken(user: User) {
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

        return {
            token: this.jwtService.sign(payload),
        };
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }
}
