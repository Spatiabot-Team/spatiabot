import {SocialLocalInterface} from "../../../domain/interfaces/social-local.interface";
import {RoleInterface} from "../../../domain/interfaces/role.interface";

/**
 * Command used in CreateUserWithSocialLocalHandler
 */
export class CreateUserWithSocialLocalCommand {

    socialLocal: SocialLocalInterface;
    role ?: RoleInterface;

    constructor(socialLocal: SocialLocalInterface, role: RoleInterface | null = null) {
        this.socialLocal = socialLocal;
        this.role = role;
    }
}
