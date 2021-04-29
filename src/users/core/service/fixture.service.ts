import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entity/user.entity";
import {RolesEnum} from "../enum/roles.enum";
import {Role} from "../entity/role.entity";
import {UserRepository} from "../repository/user.repository";
import {RoleRepository} from "../repository/role.repository";
import {EncrDecrService} from "../../local/enc-decr.service";
import {SocialLocalRepository} from "../repository/social-local.repository";

@Injectable()
export class FixtureService {

    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        @InjectRepository(RoleRepository) private readonly roleRepository: RoleRepository,
        @InjectRepository(SocialLocalRepository) private readonly socialLocalRepository: SocialLocalRepository,
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
}
