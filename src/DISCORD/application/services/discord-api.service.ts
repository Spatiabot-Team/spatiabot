import {Injectable} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {firstValueFrom} from "rxjs";

@Injectable()
export class DiscordApi {

    // static DISCORD_TOKEN_URL = "";
    //
    constructor(private httpService: HttpService) {}
    //
    async getInfosUser(accessToken) {

        const res = await firstValueFrom(this.httpService.get('https://discord.com/api/users/@me/guilds',
            { headers: {Authorization : `Bearer ${accessToken}`}}));
        return res.data;
    }

}
