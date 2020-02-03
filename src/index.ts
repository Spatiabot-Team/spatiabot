import "reflect-metadata";
import {createConnection} from "typeorm";
import {Api} from "./api";
import {Spatiabot} from "./discord";
import {Fixture} from "./core/fixture";

createConnection().then(async connection => {
    // await Fixture.load();
    Api().start();
    // Spatiabot().start();
}).catch(error => console.log(error));
