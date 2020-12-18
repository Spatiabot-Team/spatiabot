import {Body, Controller, Get, HttpCode, Post, Req, Request, UseGuards} from '@nestjs/common';
import {LocalAuthGuard} from '../auth/local-auth.guard';
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "../../database/repository/user.repository";
import {JwtService} from "@nestjs/jwt";
import {GoogleService} from "./google.service";
import {AppGateway} from "../../app.gateway";
import {AuthGuard} from "@nestjs/passport";
import {ApiTags} from "@nestjs/swagger";
import {UserLoginDto} from "../../database/dto/user-login.dto";
import {EncrDecrService} from "../local/enc-decr.service";

@ApiTags('Users')
@Controller()
export class GoogleController {

    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        private jwtService: JwtService,
        private readonly googleService: GoogleService,
        private appGateway: AppGateway,
        private encrDecrService: EncrDecrService,
    ) {
    }

    @Get('auth/google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
        return 'todo';
    }

    /**
     * Google redirect on this route after authentication
     * @param req
     */
    @Get('auth/google-redirect')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {

        /**
         * regarde du côté de
         * var socket = io("http://localhost", {
              extraHeaders: {
                Authorization: "Bearer authorization_token_here"
              }
            });
         */
        this.appGateway.server.emit('google', {token: this.googleService.googleLogin(req)});
        // io.in(req.session.socketId).emit(args[0].provider, user);
        // res.end();
        return;
    }





    // @UseGuards(LocalAuthGuard)
    // @HttpCode(200)
    // @Post('auth/login')
    // async login(@Request() req, @Body() user: UserLoginDto) {
    //     const payload = {
    //         login: req.user.username,
    //         username: req.user.username,
    //         id: req.user.id,
    //         sub: req.user.id,
    //         roles: req.user.roles,
    //         preferences:req.user.preferences
    //     };
    //
    //     return {
    //         token: this.jwtService.sign(payload),
    //     };
    // }

    // @HttpCode(200)
    // @Post('auth/check-jwt')
    // async checkJWT(@Request() req) {
    //     return {
    //         token: req.body.token,
    //     };
    // }



    // @Post('auth/register')
    // async register(@Request() req) {
    //
    //     // @todo use validations
    //     if (req.body.login == '' || req.body.password == '') {
    //         return {success: false, message: 'Login pass empty'};
    //     }
    //
    //     // Verify the email is not already attached to an account
    //     if (await this.userRepository.isEmailAccountExists(req.body.email)) {
    //         return {success: false, message: 'This email is already attached to an account'};
    //     }
    //
    //
    //     await this.userRepository.createUser({
    //         username: req.body.username,
    //         email: req.body.email,
    //         password: this.encrDecrService.encrypt(process.env.salt, req.body.password)
    //     });
    //
    //     return {success: true, message: "Account created !"};
    //     // return this.authService.login(req.user);
    // }


    // @Get('profile')
    // @UseGuards(JwtAuthGuard)
    // @Roles('admin')
    // getProfile(@Request() req) {
    //   return req.user;
    // }
    //
    // @Get('hello')
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles('admin')
    // async create() {
    //   return "It works !";
    // }

}
