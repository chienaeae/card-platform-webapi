import sequelize from "../config/config";
import {Trader} from "./Trader.model";
import {IdentityUser} from "./IdentityUser.model";
import path from "path";

sequelize.addModels([Trader, IdentityUser])

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export {
    Trader,
    IdentityUser
}