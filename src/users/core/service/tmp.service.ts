// import {SocialDiscord} from "../entity/social-discord.entity";
//
// class tmp{
// async createOrUpdateDiscordGuilds(socialDiscord: SocialDiscord, profile) {
//
//     // Guilds
//     const discordGuilds = await this.discordGuildRepository.findByGuildIds(profile.guilds.map(g => g.id));
//     for (const guild of profile.guilds) {
//
//         let guildDb = discordGuilds.find(g => g.guildId == guild.id);
//         if (guildDb === undefined) {
//             guildDb = await this.discordGuildRepository.save({
//                 guildId: guild.id,
//                 name: guild.name,
//                 prefix: process.env.DISCORD_GUILD_PREFIX_DEFAULT,
//                 icon: this.discordCdn.buildGuildIcon(guild.id, guild.icon),
//                 discordGuildUsers: []
//             });
//         }
//
//         // Relation between guild and social discord
//         let guildUser = guildDb.discordGuildUsers.find(du => du.socialDiscord.id === socialDiscord.id);
//         if (!guildUser) {
//             guildUser = {socialDiscord};
//         }
//
//         await this.discordGuildUserRepository.save({
//             ...guildUser,
//             discordGuild: guildDb,
//             permissions: guild.permissions,
//             isOwner: guild.owner
//         });
//     }
//
// }
// }
