import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {UserService} from "../../../../application/services/user.service";
import {LocalAuthGuard} from "../../security/local-auth.guard";
import {UserRegisterDto} from "../../dtos/user-register.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {SocialDiscordRepository} from "../../../database/repositories/social-discord.repository";
import {
    SocialDiscordRepositoryInterface
} from "../../../../application/repositories/social-discord.repository.interface";
import {UserRepository} from "../../../database/repositories/user.repository";

@ApiTags('Users')
@ApiBearerAuth()
@Controller()
export class SocialLocalLoginController {

    constructor(
        private readonly userService: UserService,
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
    ) {
    }

    /**
     * LocalAuthGuard va s'occuper de vérifier que le user a renseigné les bons identifiants de connexion
     * et va ajouter à l'objet req le user
     * Si le user est absent de l'objet req alors c'est qu'il y a une erreur dans l'authentification
     * cf : ../security/local-auth.guard/LocalStrategy
     * @param req
     * @param socialLocal
     */
    @UseGuards(LocalAuthGuard)
    @Post('/local/login')
    async login(@Request() req: { user: any }, @Body() socialLocal: UserRegisterDto) {
        if (!req.user) {
            return false;
        }

        return this.userService.generateToken(await this.userRepository.findProfil(req.user.id));
    }


}
