import {Body, Controller, Get, Post, Req, Request, UseGuards} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "../core/repository/user.repository";
import {JwtService} from "@nestjs/jwt";
import {GoogleService} from "./google.service";
import {AppGateway} from "../../app.gateway";
import {AuthGuard} from "@nestjs/passport";
import {ApiTags} from "@nestjs/swagger";
import {EncrDecrService} from "../local/enc-decr.service";
import {UsersService} from "../local/users.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@ApiTags('Users')
@Controller()
export class GoogleController {

    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        private jwtService: JwtService,
        private usersService: UsersService,
        private readonly googleService: GoogleService,
        private appGateway: AppGateway
    ) {
    }

    @Get('auth/google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
        return 'google-auth';
    }

    /**
     * Google redirect on this route after authentication
     * @param req
     */
    @Get('auth/google-redirect')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
        const payload = {googleId: req.user.socialGoogle.googleId};
        this.appGateway.server.emit('google', {socialToken: this.jwtService.sign(payload)});
        return;
    }

    @Post('google/register')
    async register(@Request() req, @Body() body: any) {
        const socialToken = this.jwtService.verify(body.socialToken);
        const socialGoogle = await this.googleService.socialGoogleRepository.findOne({where: {googleId: socialToken.googleId}});
        const user = await this.usersService.userRepository.findByGoogleOrCreate(socialGoogle);
        return this.usersService.generateToken(user);
    }

    @Post('google/connect')
    @UseGuards(JwtAuthGuard)
    // @Roles('admin')
    async connect(@Request() req, @Body() body: any) {
        const socialToken = this.jwtService.verify(body.socialToken);
        const socialGoogle = await this.googleService.socialGoogleRepository.findOne({where: {googleId: socialToken.googleId}});
        await this.usersService.userRepository.updateGoogle(req.user.id,socialGoogle);
        const user = await this.usersService.userRepository.findByGoogleId(socialGoogle.googleId);
        return this.usersService.generateToken(user);
    }

}
