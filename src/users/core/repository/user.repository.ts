import {EntityRepository, Repository} from 'typeorm';
import {User} from "../entity/user.entity";
import {UserRegisterDto} from "../dto/user-register.dto";
import {JwtService} from "@nestjs/jwt";
import {UserUpdateDto} from "../dto/user-update.dto";
import {SocialDiscord} from "../entity/social-discord.entity";
import {SocialGoogle} from "../entity/social-google.entity";
import {RolesEnum} from "../enum/roles.enum";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    constructor(private jwtService: JwtService) {
        super();
    }

    async fetchAdmins(){
        return await this.find({
            where:
                qb => {
                    qb.where('User_roles.label = :role', {role: RolesEnum.ADMIN})
                }
        });
    }

    isEmailAccountExists = async (email: string) => {
        return await this.findOne({where: {email}}) !== undefined;
    };

    createUser = async (userRegisterDto: UserRegisterDto) => {
        return await this.save(userRegisterDto);
    };

    updateUser = async (id: string, userUpdateDto: UserUpdateDto) => {
        return this.save({...userUpdateDto, id: String(id)});
    };

    //////////////////// DISCORD ////////////////

    updateDiscord = async (userId, socialDiscord: SocialDiscord) => {
        await this.update(userId,{socialDiscord});
    };

    findByDiscordId = async (discordId): Promise<User> => {
        return await this.findOne({
            where: qb => {
                qb.where('User_socialDiscord.discordId = :discordId', {discordId})
            }
        });
    }

    //////////////////////// GOOGLE ////////////////
    findByGoogleOrCreate = async (socialGoogle: SocialGoogle): Promise<User> => {
        let user = await this.findByGoogleId(socialGoogle.googleId);

        if (!user) {
            user = await this.save({
                username: socialGoogle.username,
                email: socialGoogle.email,
                avatar: socialGoogle.avatar,
                socialGoogle
            });
        } else {
            await this.update(user.id,{
                avatar: socialGoogle.avatar
            });
        }

        return user;
    };

    updateGoogle = async (userId, socialGoogle: SocialGoogle) => {
        await this.update(userId,{socialGoogle});
    };

    findByGoogleId = async (googleId): Promise<User> => {
        return await this.findOne({
            where: qb => {
                qb.where('User_socialGoogle.googleId = :googleId', {googleId})
            }
        });
    }

    //////////////////////////// LOCAL /////////////////
    findBySocialAuth = async (username, passwordCrypted): Promise<User> => {
        return await this.findOne({
            where: qb => {
                qb.where('LOWER(User_socialLocal.username) = LOWER(:username) AND User_socialLocal.password = :password', {
                    username,
                    password: passwordCrypted
                })
            }
        });
    }

    //////////////////////////// Generated /////////////////
    findByGeneratedId = async (generatedId): Promise<User> => {
        return await this.findOne({
            where: qb => {
                qb.where('User_socialGenerated.generatedId = :generatedId', {generatedId})
            }
        });
    }
}
