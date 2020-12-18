import {EntityRepository, Repository} from 'typeorm';
import {User} from "../entity/user.entity";
import {UserRegisterDto} from "../dto/user-register.dto";
import {JwtService} from "@nestjs/jwt";
import {UserUpdateDto} from "../dto/user-update.dto";
import {SocialDiscord} from "../entity/social-discord.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    constructor(private jwtService: JwtService) {
        super();
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

    findByDiscordOrCreate = async (socialDiscord: SocialDiscord): Promise<User> => {
        let user = await this.findByDiscordId(socialDiscord.discordId);

        if (!user) {
            user = await this.save({
                username: socialDiscord.username,
                email: socialDiscord.email,
                avatar: socialDiscord.avatar,
                socialDiscord
            });
        } else {
            await this.update(user.id,{
                avatar: socialDiscord.avatar
            });
        }

        return user;
    };

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

    findBySocialAuth = async (username, passwordCrypted): Promise<User> => {
        return await this.findOne({
            where: qb => {
                qb.where('User_socialLocal.username = :username AND User_socialLocal.password = :password', {
                    username,
                    password: passwordCrypted
                })
            }
        });
    }
}
