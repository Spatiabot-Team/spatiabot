import {Body, Controller, Get, Post, Req, Request, UseGuards} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "../../database/repository/user.repository";
import {JwtService} from "@nestjs/jwt";
import {DiscordUserService} from "./discord-user.service";
import {AppGateway} from "../../app.gateway";
import {AuthGuard} from "@nestjs/passport";
import {ApiTags} from "@nestjs/swagger";
import {UsersService} from "../local/users.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@ApiTags('Users')
@Controller()
export class DiscordController {

    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        private jwtService: JwtService,
        private usersService: UsersService,
        private readonly discordService: DiscordUserService,
        private appGateway: AppGateway
    ) {
    }

    @Get('auth/discord')
    @UseGuards(AuthGuard('discord'))
    async discordAuth(@Req() req) {
        return 'discord-auth';
    }

    /**
     * Discord redirect on this route after authentication
     * @param req
     */
    @Get('auth/discord-redirect')
    @UseGuards(AuthGuard('discord'))
    discordAuthRedirect(@Req() req) {
        const payload = {discordId: req.user.socialDiscord.discordId};
        this.appGateway.server.emit('discord', {socialToken: this.jwtService.sign(payload)});
        return;
    }

    @Post('discord/register')
    async register(@Request() req, @Body() body: any) {
        const socialToken = this.jwtService.verify(body.socialToken);
        const socialDiscord = await this.discordService.socialDiscordRepository.findOne({where: {discordId: socialToken.discordId}});
        const user = await this.usersService.userRepository.findByDiscordOrCreate(socialDiscord);
        return this.usersService.generateToken(user);
    }

    @Post('discord/connect')
    @UseGuards(JwtAuthGuard)
    // @Roles('admin')
    async connect(@Request() req, @Body() body: any) {
        const socialToken = this.jwtService.verify(body.socialToken);
        const socialDiscord = await this.discordService.socialDiscordRepository.findOne({where: {discordId: socialToken.discordId}});
        await this.usersService.userRepository.updateDiscord(req.user.id,socialDiscord);
        const user = await this.usersService.userRepository.findByDiscordId(socialDiscord.discordId);
        return this.usersService.generateToken(user);
    }

}
