import {Module} from '@nestjs/common';
import {UsersService} from "./local/users.service";
import {GoogleController} from "./google/google.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../database/entity/user.entity";
import {UserRepository} from "../database/repository/user.repository";
import {Role} from "../database/entity/role.entity";
import {LocalStrategy} from "./auth/local.strategy";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./auth/jwt.strategy";
import {GoogleStrategy} from "./google/google.strategy";
import {GoogleService} from "./google/google.service";
import {AppGateway} from "../app.gateway";
import {UserController} from "./local/user.controller";
import {RoleRepository} from "../database/repository/role.repository";
import {EncrDecrService} from "./local/enc-decr.service";
import {DiscordStrategy} from "./discord/discord.strategy";
import {DiscordUserService} from "./discord/discord-user.service";
import {DiscordController} from "./discord/discord.controller";
import {DiscordGuild} from "../database/entity/discord-guild.entity";
import {DiscordGuildRepository} from "../database/repository/discord-guild.repository";
import {DiscordGuildUser} from "../database/entity/discord-guild-user.entity";
import {DiscordGuildUserRepository} from "../database/repository/discord-guild-user.repository";
import {DiscordRole} from "../database/entity/discord-role.entity";
import {DiscordRoleRepository} from "../database/repository/discord-role.repository";
import {DiscordCdn} from "./discord/discord-cdn.service";
import {DiscordGuildsController} from "./discord/discord-guild.controller";
import {AuthService} from "./local/auth.service";
import {SocialDiscord} from "../database/entity/social-discord.entity";
import {SocialDiscordRepository} from "../database/repository/social-discord.repository";
import {SocialGoogleRepository} from "../database/repository/social-google.repository";
import {SocialGoogle} from "../database/entity/social-google.entity";
import {SocialLocal} from "../database/entity/social-local.entity";
import {SocialLocalRepository} from "../database/repository/social-local.repository";

@Module({
    providers: [
        AppGateway,
        JwtStrategy,
        LocalStrategy, UsersService,
        GoogleStrategy, GoogleService,
        DiscordStrategy, DiscordUserService,
        DiscordCdn,
        AuthService,
        EncrDecrService
    ],
    imports: [
        TypeOrmModule.forFeature([
            User, UserRepository,
            SocialDiscord, SocialDiscordRepository,
            SocialGoogle, SocialGoogleRepository,
            SocialLocal, SocialLocalRepository,
            Role, RoleRepository,
            DiscordGuild, DiscordGuildRepository,
            DiscordGuildUser, DiscordGuildUserRepository,
            DiscordRole,DiscordRoleRepository
        ]),
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: process.env.JWT_KEY_SECRET,
            signOptions: {expiresIn: process.env.JWT_EXPIRES_IN || '600s'},
        }),
    ],
    exports: [UsersService, EncrDecrService, DiscordUserService],
    controllers: [GoogleController, DiscordController,DiscordGuildsController, UserController]
})
export class UsersModule {
}
