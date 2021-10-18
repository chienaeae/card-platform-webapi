import {Sequelize} from "sequelize-typescript";
import * as dotenv from "dotenv";
import {Card as CardModel} from "../models/Card.models";
import {CardOrder as CardOrderModel} from "../models/CardOrder.model";
import {CardTrade as CardTradeModel} from "../models/CardTrade.model";
import {Trader as TraderModel} from "../models/Trader.model";
import {IdentityUser as IdentityUserModel} from "../models/IdentityUser.model";

dotenv.config();

const databaseCredentials = {
    development: {
        username: process.env.CARD_PLATFORM_DB_USER,
        password: process.env.CARD_PLATFORM_DB_PASSWORD,
        host: process.env.CARD_PLATFORM_DB_HOST,
        database: process.env.CARD_PLATFORM_DB_DEV_DB_NAME
    },
    test: {
        username: process.env.CARD_PLATFORM_DB_USER,
        password: process.env.CARD_PLATFORM_DB_PASSWORD,
        host: process.env.CARD_PLATFORM_DB_HOST,
        database: process.env.CARD_PLATFORM_DB_TEST_DB_NAME
    },
    production: {
        username: process.env.CARD_PLATFORM_DB_USER,
        password: process.env.CARD_PLATFORM_DB_PASSWORD,
        host: process.env.CARD_PLATFORM_DB_HOST,
        database: process.env.CARD_PLATFORM_DB_PROD_DB_NAME
    }
}

const {username, password, host, database} =
    process.env.NODE_ENV === 'production' ? databaseCredentials.production :
        process.env.NODE_ENV === 'test' ? databaseCredentials.test :
            databaseCredentials.development

const sequelize: Sequelize = new Sequelize(
    database,
    username,
    password, {
        host,
        dialect: 'mysql',
        port: 3306,
        dialectOptions: {
            multipleStatements: true,
        },
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        logging: false
    });


sequelize.addModels([CardModel, CardOrderModel, CardTradeModel, TraderModel, IdentityUserModel
])

async function authConnection() {
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection has been established successfully.');
    }catch (error){
        console.error('Unable to connect to the database:', error);
    }
}



export {authConnection, CardModel, CardOrderModel, CardTradeModel, TraderModel, IdentityUserModel};