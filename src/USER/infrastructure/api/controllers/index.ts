import {SocialLocalRegisterController} from "./social-local/social-local.register.controller";
import {SocialLocalLoginController} from "./social-local/social-local.login.controller";
import {SocialDiscordLoginController} from "./social-discord/social-discord.login.controller";
import {SocialDiscordConnectController} from "./social-discord/social-discord.connect.controller";
import {UserProfileController} from "./user/user.profile.controller";
import {UserUpdatePreferencesController} from "./user/user.update-preferences.controller";

export const ControllersUser = [
    SocialLocalRegisterController,
    SocialLocalLoginController,
    UserProfileController,
    UserUpdatePreferencesController,
    SocialDiscordLoginController,
    SocialDiscordConnectController
];
