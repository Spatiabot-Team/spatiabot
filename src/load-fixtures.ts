import "reflect-metadata";
import {createConnection} from "typeorm";
import {Api} from "./api";
import {Spatiabot} from "./discord";
import {Fixture} from "./core/fixture";

createConnection().then(async connection => {
    await Fixture.load();
}).catch(error => console.log(error));
