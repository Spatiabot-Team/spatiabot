import {Controller, Get} from '@nestjs/common';


@Controller()
export class AppController {

    @Get()
    getHello(): string {
        return "hello guys !";
    }

    // @UseGuards(LocalAuthGuard)
    // @Post('auth/login')
    // async login(@Request() req) {
    //   return this.authService.login(req.user);
    // }
    //
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
