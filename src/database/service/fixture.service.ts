import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entity/user.entity";
import {RolesEnum} from "../enums/roles.enum";
import {Role} from "../entity/role.entity";
import {UserRepository} from "../repository/user.repository";
import {RoleRepository} from "../repository/role.repository";
import {EncrDecrService} from "../../users/local/enc-decr.service";
import {DiscordRole} from "../entity/discord-role.entity";
import {DiscordRolesEnum} from "../enums/discord-roles.enum";
import {DiscordRoleRepository} from "../repository/discord-role.repository";
import {SocialLocal} from "../entity/social-local.entity";
import {SocialLocalRepository} from "../repository/social-local.repository";
import {Monde} from "../entity/monde.entity";
import {MondeRepository} from "../repository/monde.repository";
import monde from "../datas/monde";

@Injectable()
export class FixtureService {

    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        @InjectRepository(RoleRepository) private readonly roleRepository: RoleRepository,
        @InjectRepository(SocialLocalRepository) private readonly socialLocalRepository: SocialLocalRepository,
        @InjectRepository(DiscordRoleRepository) private readonly discordRoleRepository: DiscordRoleRepository,
        @InjectRepository(MondeRepository) private readonly mondeRepository: MondeRepository,
        private encrDecrService: EncrDecrService,
    ) {
    }

    async generateAdmins(): Promise<User[]> {

        const users = process.env.user.split(/\s*,\s*/);

        const res = [];

        for (const user of users) {
            const userAlreadyExist = await this.userRepository.findOne({username: user});

            if (userAlreadyExist) {
                res.push(userAlreadyExist);
            } else {
                const roleAdmin = await this.roleRepository.findOne({where: {label: RolesEnum.ADMIN}});
                const socialLocal = await this.socialLocalRepository.save({
                    username: user,
                    password: this.encrDecrService.encrypt(process.env.salt, process.env.password)
                })
                res.push(
                    await this.userRepository.save({
                        username: user,
                        socialLocal,
                        roles: [roleAdmin]
                    })
                );
            }
        }
        return res;
    }

    async generateRoles(): Promise<Role[]> {
        const roles = Object.values(RolesEnum);
        for (const role of roles) {
            if (!await this.roleRepository.findOne({where: {label: role}})) {
                await this.roleRepository.save({label: role});
            }
        }
        return await this.roleRepository.find();
    }

    async generateDiscordRoles(): Promise<DiscordRole[]> {
        const roles = Object.values(DiscordRolesEnum);
        for (const role of roles) {
            if (!await this.discordRoleRepository.findOne({where: {label: role}})) {
                await this.discordRoleRepository.save({label: role});
            }
        }
        return await this.discordRoleRepository.find();
    }

    async generateMonde(auteurs:User[]) : Promise<Monde>{
        monde.auteurs = auteurs;
        return await this.mondeRepository.save(monde);
    }

}
