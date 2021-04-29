import {Injectable} from '@nestjs/common';
import {UsersService} from "../local/users.service";
import {UserDto} from "../core/dto/user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {DiscordCdn} from "../../discord/core/service/discord-cdn.service";
import {SocialDiscordRepository} from "../core/repository/social-discord.repository";

@Injectable()
export class DiscordUserService {

    constructor(
        private usersService: UsersService,
        @InjectRepository(SocialDiscordRepository) public readonly socialDiscordRepository: SocialDiscordRepository,
        private discordCdn: DiscordCdn
    ) {
    }

    async createOrUpdateSocialDiscord(profile) {

        let socialDiscord = await this.socialDiscordRepository.findOne({where: {discordId: profile.id}});

        if (!socialDiscord) {
            socialDiscord = await this.socialDiscordRepository.save({
                discordId: profile.id,
                email: profile.email,
                username: profile.username,
                accessToken: profile.accessToken,
                avatar: this.discordCdn.buildAvatar(profile.id, profile.avatar)
            });
        } else {
            await this.socialDiscordRepository.update(socialDiscord.id, {
                ...socialDiscord,
                accessToken: profile.accessToken,
                avatar: this.discordCdn.buildAvatar(profile.id, profile.avatar)
            });
        }

        return socialDiscord;
    }

    async register(profile): Promise<UserDto | null> {//: Promise<UserDto> {

        return null;
        // // Does this discord user exist in db
        // let userDb = await this.usersService.userRepository.findOne({where: {discordId: profile.id}});
        //
        // if (!userDb) {
        //
        //
        //     // Create the user
        //     const roleMember = await this.roleRepository.findOne({where: {label: RolesEnum.MEMBER}});
        //     const user: User = {
        //         discordId: profile.id,
        //         username: profile.username,
        //         discordOnly: true,
        //         email: profile.email,
        //         roles: [roleMember],
        //         password: null,
        //         avatar: this.discordCdn.buildAvatar(profile.id, profile.avatar),
        //         discordAccount: {
        //             accessToken: profile.accessToken
        //         }
        //     };
        //     userDb = await this.usersService.userRepository.save(user);
        // }
        //
        //
        //
        // return {
        //     id: userDb.id,
        //     discordId: userDb.discordId,
        //     username: userDb.username,
        //     email: userDb.email,
        //     roles: userDb.roles.map(r => r.label),
        //     preferences: userDb.preferences
        // };
    }
}
