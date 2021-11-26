// import {Injectable} from '@nestjs/common';
// import {JwtService} from "@nestjs/jwt";
// import {InjectRepository} from "@nestjs/typeorm";
//
// @Injectable()
// export class UsersService {
//     //
//     constructor(
//         @InjectRepository(UserRepository) public readonly userRepository: UserRepository,
//         @InjectRepository(RoleRepository) private readonly roleRepository: RoleRepository,
//         private jwtService: JwtService,
//         private encrDecrService: EncrDecrService,
//     ) {
//     }
//
//     async validateUser(username, password): Promise<User | null> {//: Promise<UserDto> {
//         const passwordCrypted = this.encrDecrService.encrypt(process.env.salt, password);
//         const user = await this.userRepository.findBySocialAuth(username, passwordCrypted);
//         return user || null;
//     }
//
//     generateToken(user: User) {
//         const payload: any = {
//             username: user.username,
//             id: user.id,
//             sub: user.id,
//             preferences: user.preferences,
//             roles: user.roles.length > 0 ? user.roles.map(r => r.label) : [],
//             socialDiscord: null
//         };
//
//         if (user.socialDiscord) {
//             payload.socialDiscord = {discordId: user.socialDiscord.discordId}
//         }
//
//         if (user.socialGoogle) {
//             payload.socialGoogle = {googleId: user.socialGoogle.googleId}
//         }
//
//         return {
//             token: this.jwtService.sign(payload),
//         };
//     }
//
//     async findAll(): Promise<User[]> {
//         return this.userRepository.find();
//     }
//
//     async validateGeneratedUser(generatedId:string){
//         return "validateGeneratedUser";
//     }
//
//
//     findByDiscordOrCreate = async (socialDiscord: SocialDiscord): Promise<User> => {
//         let user = await this.userRepository.findByDiscordId(socialDiscord.discordId);
//
//         if (!user) {
//             const roleDefault = await this.roleRepository.getDefaultRole();
//             user = await this.userRepository.save({
//                 username: socialDiscord.username,
//                 email: socialDiscord.email,
//                 avatar: socialDiscord.avatar,
//                 roles : [roleDefault],
//             socialDiscord
//         });
//         } else {
//             await this.userRepository.update(user.id,{
//                 avatar: socialDiscord.avatar
//             });
//         }
//
//         return user;
//     };
// }
