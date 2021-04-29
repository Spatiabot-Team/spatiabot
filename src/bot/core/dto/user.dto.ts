export class UserDto {
    readonly id: string;
    readonly socialDiscord : any;
    readonly username: string;
    readonly roles: string[];
    readonly preferences ?: any;
}
