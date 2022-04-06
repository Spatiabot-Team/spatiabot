// import {Injectable} from '@nestjs/common';
// import {UsersService} from './users.service';
// import {JwtService} from '@nestjs/jwt';
//
// @Injectable()
// export class AuthService {
//     constructor(
//         private usersService: UsersService,
//         private jwtService: JwtService
//     ) {
//     }
//
//     async validateUser(login: string, pass: string): Promise<any> {
//         // const user = await this.usersService.findOne(login);
//         const user = null;
//
//         if (user && user.password === pass) {
//             const {password, ...result} = user;
//             return result;
//         }
//         return null;
//     }
//
//     async login(user: any) {
//         const payload = {
//             login: user.login,
//             id: user.id,
//             sub: user.id,
//             preferences: user.preferences,
//             roles: user.roles
//         };
//         return {
//             token: this.jwtService.sign(payload),
//         };
//     }
// }
