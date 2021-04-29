import {Module} from '@nestjs/common';
import {UsersService} from "./local/users.service";
import {GoogleController} from "./google/google.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./core/entity/user.entity";
import {UserRepository} from "./core/repository/user.repository";
import {Role} from "./core/entity/role.entity";
import {LocalStrategy} from "./auth/local.strategy";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./auth/jwt.strategy";
import {GoogleStrategy} from "./google/google.strategy";
import {GoogleService} from "./google/google.service";
import {AppGateway} from "../app.gateway";
import {UserController} from "./local/user.controller";
import {RoleRepository} from "./core/repository/role.repository";
import {EncrDecrService} from "./local/enc-decr.service";
import {DiscordStrategy} from "./discord/discord.strategy";
import {DiscordUserService} from "./discord/discord-user.service";
import {DiscordController} from "./discord/discord.controller";
import {DiscordCdn} from "../discord/core/service/discord-cdn.service";
import {AuthService} from "./local/auth.service";
import {SocialDiscord} from "./core/entity/social-discord.entity";
import {SocialDiscordRepository} from "./core/repository/social-discord.repository";
import {SocialGoogleRepository} from "./core/repository/social-google.repository";
import {SocialGoogle} from "./core/entity/social-google.entity";
import {SocialLocal} from "./core/entity/social-local.entity";
import {SocialLocalRepository} from "./core/repository/social-local.repository";
import {AdminController} from "./admin/admin.controller";
import {LocalController} from "./local/local.controller";
import {SocialGenerated} from "./core/entity/social-generated.entity";
import {SocialGeneratedRepository} from "./core/repository/social-generated.repository";
import {SocialGeneratedController} from "./generated/social-generated.controller";
import {InitController} from "./InitController";
import {FixtureService} from "./core/service/fixture.service";

@Module({
    providers: [
        AppGateway,
        JwtStrategy,
        LocalStrategy, UsersService,
        GoogleStrategy, GoogleService,
        DiscordStrategy, DiscordUserService,
        DiscordCdn,
        AuthService,
        EncrDecrService,
        FixtureService
    ],
    imports: [
        TypeOrmModule.forFeature([
            User, UserRepository,
            SocialDiscord, SocialDiscordRepository,
            SocialGoogle, SocialGoogleRepository,
            SocialLocal, SocialLocalRepository,
            SocialGenerated, SocialGeneratedRepository,
            Role, RoleRepository
        ]),
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: process.env.JWT_KEY_SECRET,
            signOptions: {expiresIn: process.env.JWT_EXPIRES_IN || '600s'},
        })
    ],
    exports: [UsersService, EncrDecrService, DiscordUserService],
    controllers: [
        InitController,
        AdminController,
        GoogleController,
        DiscordController,
        LocalController,
        SocialGeneratedController,
        UserController
    ]
})
export class UsersModule {
}
