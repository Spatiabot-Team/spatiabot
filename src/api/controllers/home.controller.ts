import {Request, Response} from "express";
import * as path from "path";

export const HomeController = {

    index: async (req: Request, res: Response) => {
	console.log(__dirname + '/../public/index.html');
	res.sendFile(path.join(__dirname + '/../public/index.html'));
    }

};
