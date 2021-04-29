import {Body, Controller, Get, HttpException, HttpStatus, Param, Put, Request, UseGuards} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "../core/repository/user.repository";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {RoleRepository} from "../core/repository/role.repository";
import {In} from "typeorm";
import {RolesEnum} from "../core/enum/roles.enum";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles.decorator";
import {PreferencesDto} from "../core/dto/preferences.dto";

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {

    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        @InjectRepository(RoleRepository) private readonly roleRepository: RoleRepository
    ) {
    }

    @Get('')
    @UseGuards(JwtAuthGuard)
    @Roles('admin')
    async getAdmins() {

        const users = await this.userRepository.find({
            where:
                qb => {
                    qb.where('User_roles.label = :role', {role: RolesEnum.ADMIN})
                }
        });

        return users.map(u => ({
            id: u.id,
            username: u.username,
            avatar: u.avatar
        }));
    }

    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    @Roles('admin')
    async put(@Param('id') id: string) {

        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        return await this.userRepository.save({
            id,
            roles: [
                await this.roleRepository.findOne({where: {label: RolesEnum.ADMIN}})
            ]
        });
    }

}
