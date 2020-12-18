import { Injectable } from '@nestjs/common';
import {UsersService} from "../local/users.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class GoogleService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
    }

    googleLogin(req) {
        if (!req.user) {
            return 'No user from google'
        }

        // const user: any = {
        //         email: req.user.emails[0].value,
        //         photo: req.user.photos[0].value.replace(/sz=50/gi, 'sz=250'),
        //         image: req.user._json.image.url,
        //         displayName: req.user.displayName,
        //         googleAccount: {
        //             googleId: req.user.id,
        //             googleToken: req.accessToken,
        //         },
        //     };

        const payload = {username: req.user.username,email:req.user.email, sub: req.user.id, roles: 'GOOGLE_USER'};
        return this.jwtService.sign(payload);

        // return {
        //     message: 'User information from google',
        //     user: req.user
        // }
    }

    // const user: any = {
    //     email: profile.emails[0].value,
    //     photo: profile.photos[0].value.replace(/sz=50/gi, 'sz=250'),
    //     image: profile._json.image.url,
    //     displayName: profile.displayName,
    //     googleAccount: {
    //         googleId: profile.id,
    //         googleToken: accessToken,
    //     },
    // };
}
