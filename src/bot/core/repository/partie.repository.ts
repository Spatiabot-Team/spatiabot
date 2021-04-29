import {EntityRepository, Repository} from "typeorm";
import {Partie} from "../entity/partie.entity";

@EntityRepository(Partie)
export class PartieRepository extends Repository<Partie> {

    async findCurrentOfDiscordGuild(discordGuildId: string/*, mondeId: string*/) : Promise<Partie | null> {
        return await this.findOne({ where: { discordGuild : discordGuildId,actif: true } });
    }

    async findByGuildAndMonde(discordGuildId: string, mondeId: string) : Promise<Partie[]> {
        return (await this.find({ where: { discordGuild : discordGuildId,monde : mondeId } })) || [];
    }



}
