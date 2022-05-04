import {MessageEmbed} from "discord.js";
import {Injectable} from "@nestjs/common";

@Injectable()
export class MessageEmbedService {
    /**
     * Au delà de cette limite, discord bug :'(
     */
    public MAX_SIZE_EMBED_MESSAGE = 2048;
    private color: any = 0x5F5F70;

    execute(titre : string, texte:string): MessageEmbed[] {

        const msgs = [];

        // Comme discord est limité à 2048 on va envoyer en plusiuers morceaux si ça en fait plus
        // Les \r\n (saut paragraphe) prennent 2 bytes chacun donc on va prendre une marge et mettre 2000
        const arr = texte.match(/(.|[\r\n]){1,2000}/g); // Build the array

        for (const index in arr) {
            const msg = new MessageEmbed();
            msg.setColor(this.color);
            if (index === '0') {
                msg.setTitle(titre);
            }
            msg.setDescription("_" + arr[index] + "_");
            msgs.push(msg);
        }

        return msgs;
    }
}
