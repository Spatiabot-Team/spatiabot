import {MessageEmbed} from "discord.js";
import {Injectable} from "@nestjs/common";

@Injectable()
export class EmbedService {
    /**
     * Au delà de cette limite, discord bug :'(
     */
    public MAX_SIZE_EMBED_MESSAGE = 2048;
    private color: any = 0x5F5F70;

    /**
     * Formate un message dans un format standard que l'on a déterminé
     * (exemple : mettre le bandeau en violet ou autre couleur, le titre en gras etc)
     * Comme ça on centralise cette mise en forme dans cette fonction
     */
    embedMessage(message): MessageEmbed {

        const msg = new MessageEmbed();
        msg.setColor(this.color);

        //Pour le moment on ne fait aucune mise en forme donc le code ci dessous semble inutile

        if (message.titre) {
            msg.setTitle(message.titre);
        }

        msg.setDescription(message.description);

        return msg;

        /*return {
            "title": "title ~~(did you know you can have markdown here too?)~~",
            "description": "this supports [named links](https://discordapp.com) on top of the previously shown subset of markdown. ```\nyes, even code blocks```",
            "url": "https://discordapp.com",
            "color": 5673749,
            "timestamp": "2018-03-28T12:06:34.662Z",
            "footer": {
                "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
                "text": "footer text"
            },
            "thumbnail": {
                "url": "https://cdn.discordapp.com/embed/avatars/0.png"
            },
            "image": {
                "url": "https://cdn.discordapp.com/embed/avatars/0.png"
            },
            "author": {
                "name": "author name",
                "url": "https://discordapp.com",
                "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
            },
            "fields": [
                {
                    "name": "🤔",
                    "value": "some of these properties have certain limits..."
                },
                {
                    "name": "😱",
                    "value": "try exceeding some of them!"
                },
                {
                    "name": "🙄",
                    "value": "an informative error should show up, and this view will remain as-is until all issues are fixed"
                },
                {
                    "name": "<:thonkang:219069250692841473>",
                    "value": "these last two",
                    "inline": true
                },
                {
                    "name": "<:thonkang:219069250692841473>",
                    "value": "are inline fields",
                    "inline": true
                }
            ]
        };*/
    }

}
