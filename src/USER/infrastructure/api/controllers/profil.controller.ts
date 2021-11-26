import {Controller, Get, Request, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../security/jwt-auth.guard";

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class ProfilController {

    @Get('/profile')
    @UseGuards(JwtAuthGuard)
    async login(@Request() req) {
        return {user: req.user};
    }


}
