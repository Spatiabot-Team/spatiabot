import {FixturesInterface} from "../../../../APP/services/fixtures.interface";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {RolesEnum} from "../../../domain/enum/roles.enum";
import {FindRoleQuery} from "../../../application/queries/impl/find-role.query";
import {CreateRoleCommand} from "../../../application/commands/impl/create-role.command";
import {UserInterface} from "../../../domain/interfaces/user.interface";
import {FindUserByUsernameQuery} from "../../../application/queries/impl/find-user-by-username.query";
import {RoleInterface} from "../../../domain/interfaces/role.interface";
import {CreateUserWithSocialLocalCommand} from "../../../application/commands/impl/create-user-with-social-local.command";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UsersFixtures implements FixturesInterface {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {
    }

    async generate(): Promise<any[]> {
        return [
            await this.generateRoles(),
            await this.generateAdmins()
        ]
    }

    /**
     * Génère en base les roles contenus dans RolesEnum
     */
    async generateRoles() {
        const roles = Object.values(RolesEnum);
        const promises: Promise<any>[] = [];
        for (const role of roles) {
            promises.push(this.generateRole(role));
        }
        return Promise.all(promises)
    }

    /**
     * Génère en base le role passé en paramètre
     * @param label
     */
    async generateRole(label: string): Promise<any> {
        const role = await this.queryBus.execute(new FindRoleQuery(label));
        if (role) {
            return role
        }

        return this.commandBus.execute(new CreateRoleCommand({label}));
    }

    /**
     * Génère des users définis dans le .env avec le role admin
     */
    async generateAdmins(): Promise<UserInterface[]> {

        const roleAdmin = await this.queryBus.execute(new FindRoleQuery(RolesEnum.ADMIN));
        if (!roleAdmin) {
            throw new Error('Le rôle admin n\a pas été trouvé');
        }

        const usernames : string[] = process.env.user.split(/\s*,\s*/) || [];

        const promises: Promise<any>[] = [];
        for (const username of usernames) {
            promises.push(this.generateAdmin(username, roleAdmin));
        }
        return Promise.all(promises);
    }

    async generateAdmin(username: string, roleAdmin: RoleInterface): Promise<UserInterface> {
        const userAlreadyExist = await this.queryBus.execute(new FindUserByUsernameQuery(username));
        if (userAlreadyExist) {
            return userAlreadyExist;
        }

        // Le user n'existe pas, on le crée avec le role admin
        return this.commandBus.execute(new CreateUserWithSocialLocalCommand(
            {
                username,
                password: process.env.password
            },
            roleAdmin
        ));
    }

    // async generateAdmins(): Promise<User[]> {
    //
    //     const users = process.env.user.split(/\s*,\s*/);
    //
    //     const res = [];
    //
    //     for (const user of users) {
    //         const userAlreadyExist = await this.userRepository.findOne({username: user});
    //
    //         if (userAlreadyExist) {
    //             res.push(userAlreadyExist);
    //         } else {
    //             const roleAdmin = await this.roleRepository.findOne({where: {label: RolesEnum.ADMIN}});
    //             const socialLocal = await this.socialLocalRepository.save({
    //                 username: user,
    //                 password: this.encrDecrService.encrypt(process.env.salt, process.env.password)
    //             })
    //             res.push(
    //                 await this.userRepository.save({
    //                     username: user,
    //                     socialLocal,
    //                     roles: [roleAdmin]
    //                 })
    //             );
    //         }
    //     }
    //     return res;
    // }
    //
    // async generateRoles(): Promise<Role[]> {
    //     const roles = Object.values(RolesEnum);
    //     for (const role of roles) {
    //         if (!await this.roleRepository.findOne({where: {label: role}})) {
    //             await this.roleRepository.save({label: role});
    //         }
    //     }
    //     return await this.roleRepository.find();
    // }
}
