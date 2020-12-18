import {Injectable} from '@nestjs/common';
import {UsersService} from "../local/users.service";
import {JwtService} from "@nestjs/jwt";
import {UserDto} from "../../database/dto/user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {RoleRepository} from "../../database/repository/role.repository";
import {DiscordCdn} from "./discord-cdn.service";
import {DiscordGuildRepository} from "../../database/repository/discord-guild.repository";
import {DiscordGuildUserRepository} from "../../database/repository/discord-guild-user.repository";
import {SocialDiscordRepository} from "../../database/repository/social-discord.repository";
import {SocialDiscord} from "../../database/entity/social-discord.entity";

@Injectable()
export class DiscordUserService {

    constructor(
        private usersService: UsersService,
        @InjectRepository(RoleRepository) private readonly roleRepository: RoleRepository,
        @InjectRepository(SocialDiscordRepository) public readonly socialDiscordRepository: SocialDiscordRepository,
        @InjectRepository(DiscordGuildRepository) private readonly discordGuildRepository: DiscordGuildRepository,
        @InjectRepository(DiscordGuildUserRepository) private readonly discordGuildUserRepository: DiscordGuildUserRepository,
        private jwtService: JwtService,
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
                avatar: this.discordCdn.buildAvatar(profile.id, profile.avatar)
            });
        } else {
            await this.socialDiscordRepository.update(socialDiscord.id, {
                ...socialDiscord,
                avatar: this.discordCdn.buildAvatar(profile.id, profile.avatar)
            });
        }

        return socialDiscord;
    }

    async createOrUpdateDiscordGuilds(socialDiscord: SocialDiscord, profile) {

        // Guilds
        const discordGuilds = await this.discordGuildRepository.findByGuildIds(profile.guilds.map(g => g.id));
        for (const guild of profile.guilds) {

            let guildDb = discordGuilds.find(g => g.guildId == guild.id);
            if (guildDb === undefined) {
                guildDb = await this.discordGuildRepository.save({
                    guildId: guild.id,
                    name: guild.name,
                    prefix: process.env.DISCORD_GUILD_PREFIX_DEFAULT,
                    icon: this.discordCdn.buildGuildIcon(guild.id, guild.icon),
                    discordGuildUsers: []
                });
            }

            // Relation between guild and social discord
            let guildUser = guildDb.discordGuildUsers.find(du => du.socialDiscord.id === socialDiscord.id);
            if (!guildUser) {
                guildUser = {socialDiscord};
            }

            await this.discordGuildUserRepository.save({
                ...guildUser,
                discordGuild: guildDb,
                permissions: guild.permissions,
                isOwner: guild.owner
            });
        }

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
