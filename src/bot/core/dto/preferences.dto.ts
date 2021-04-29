import {ApiProperty} from "@nestjs/swagger";

export class PreferencesDto {
    @ApiProperty()
    readonly mondeId: string;
}
