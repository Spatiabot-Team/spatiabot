import {TextBasedChannels} from "discord.js";

export class AnswerInChannelCommand {
    channel: TextBasedChannels;
    answer: string;


    constructor(channel: TextBasedChannels, answer: string) {
        this.channel = channel;
        this.answer = answer;
    }
}
