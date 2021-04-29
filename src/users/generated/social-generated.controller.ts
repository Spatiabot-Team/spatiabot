import {Body, Controller, Get, HttpException, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "../core/repository/user.repository";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles.decorator";
import {SocialGeneratedRepository} from "../core/repository/social-generated.repository";
import {UserService} from "../core/service/user.service";
import {UsersService} from "../local/users.service";
import {RoleRepository} from "../core/repository/role.repository";
import {RolesEnum} from "../core/enum/roles.enum";

@ApiTags('SocialGenerated')
@ApiBearerAuth()
@Controller()
export class SocialGeneratedController {

    constructor(
        private userService: UsersService,
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        @InjectRepository(RoleRepository) private readonly roleRepository: RoleRepository,
        @InjectRepository(SocialGeneratedRepository) private readonly socialGeneratedRepository: SocialGeneratedRepository
    ) {
    }

    @Get('/social-generated')
    @UseGuards(JwtAuthGuard)
    @Roles('admin')
    async getGeneratedUser() {
        return await this.userRepository.find({
            where: qb => {
                qb.where('User_socialGenerated.activated = false')
            }
        });
    }

    @Post('/social-generated')
    @UseGuards(JwtAuthGuard)
    @Roles('admin')
    public async post(@Body() body: any) {
        const generatedId = UserService.uuidv4()
        const socialGenerated = await this.socialGeneratedRepository.save({generatedId});
        const user = await this.userRepository.save({
            username: body.user.username ?? `Account generated - ${generatedId}`,
            roles : [await this.roleRepository.findByRoleName(RolesEnum.VIP)],
            socialGenerated
        });
        return user;
    }

    /**
     * Return a local token strategy but with the role "GENERATED"
     * @param req
     */
    @Post('/auth/generated')
    async generatedAuth(@Body() body) {
        const user = await this.userRepository.findByGeneratedId(body.token);
        if (!user) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return this.userService.generateToken(user);
    }

}
