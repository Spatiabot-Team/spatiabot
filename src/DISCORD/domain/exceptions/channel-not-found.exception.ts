export class ChannelNotFoundException extends Error{

    constructor(channelId:string) {
        super(`CHANNEL_NOT_FOUND ${channelId}`);
    }
}
