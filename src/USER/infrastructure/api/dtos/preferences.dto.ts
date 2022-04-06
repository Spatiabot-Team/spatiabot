import {IsNotEmpty} from "class-validator";

export class PreferencesDto {

    @IsNotEmpty()
    preferences: any;
}
