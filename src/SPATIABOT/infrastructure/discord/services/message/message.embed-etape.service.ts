import {MessageEmbed} from "discord.js";
import {Injectable} from "@nestjs/common";
import {EtapeInterface} from "../../../../domain/interfaces/etape.interface";

@Injectable()
export class MessageEmbedEtapeService {
    /**
     * Au delà de cette limite, discord bug :'(
     */
    public MAX_SIZE_EMBED_MESSAGE = 2048;
    private color: any = 0x5F5F70;

    execute(etape: EtapeInterface): MessageEmbed[] {

        const msgs = [];

        // Comme discord est limité à 2048 on va envoyé en plusiuers morceaux si ça en fait plus
        // Les \r\n (saut paragraphe) prennent 2 bytes chacun donc on va prendre une marge et mettre 2000
        const arr = etape.texte.match(/(.|[\r\n]){1,2000}/g); // Build the array

        for (const index in arr) {
            const msg = new MessageEmbed();
            msg.setColor(this.color);
            if (index === '0') {
                msg.setTitle(etape.titre);
            }
            msg.setDescription("_" + arr[index] + "_");
            msgs.push(msg);
        }

        // Réponses
        if (!etape.finScenario && etape.reponses) {
            etape.reponses.forEach(r => msgs[msgs.length - 1].addField(`__${process.env.BOT_PREFIX}reponse ${r.libelle}__ : ${r.titre}`, r.texte));
        }

        if(etape.finScenario){
            etape.reponses.forEach(r => msgs[msgs.length - 1].addField(`__${process.env.BOT_PREFIX}reponse terminer__`, 'Terminé.'));
        }

        return msgs;
    }
}
