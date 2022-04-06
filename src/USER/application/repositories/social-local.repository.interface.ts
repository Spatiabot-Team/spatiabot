import {SocialLocalInterface} from "../../domain/interfaces/social-local.interface";
import {UserInterface} from "../../domain/interfaces/user.interface";

export interface SocialLocalRepositoryInterface {
    createSocialLocal(socialLocal: SocialLocalInterface): Promise<SocialLocalInterface>;

    findByUsername(username: string): Promise<UserInterface | undefined>;
}
