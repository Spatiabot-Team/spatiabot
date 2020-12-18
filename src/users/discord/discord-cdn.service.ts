import {Injectable} from '@nestjs/common';

@Injectable()
export class DiscordCdn {

    buildAvatar = (userId,avatarHash) => `${process.env.DISCORD_BASE_URL}avatars/${userId}/${avatarHash}.png`;
    buildCustomEmoji = (emojiId) => `${process.env.DISCORD_BASE_URL}emojis/${emojiId}.png`;
    buildGuildIcon = (guildId,guildIcon) => `${process.env.DISCORD_BASE_URL}icons/${guildId}/${guildIcon}.png`;

    // Guild Splash	splashes/guild_id/guild_splash.png	PNG, JPEG, WebP
    // Guild Discovery Splash	discovery-splashes/guild_id/guild_discovery_splash.png	PNG, JPEG, WebP
    // Guild Banner	banners/guild_id/guild_banner.png	PNG, JPEG, WebP
    // Default User Avatar	embed/avatars/user_discriminator.png * ***	PNG
    // User Avatar	avatars/user_id/user_avatar.png **	PNG, JPEG, WebP, GIF
    // Application Icon	app-icons/application_id/icon.png	PNG, JPEG, WebP
    // Application Asset	app-assets/application_id/asset_id.png	PNG, JPEG, WebP
    // Achievement Icon	app-assets/application_id/achievements/achievement_id/icons/icon_hash.png	PNG, JPEG, WebP
    // Team Icon	team-icons/team_id/team_icon.png
}
