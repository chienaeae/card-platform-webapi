import * as dotenv from "dotenv";
import {CardPlatformSequel, DatabaseCredential} from "../../../reference/card-platform-library/src/modules/sequlize";
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

export const config: DatabaseCredential =
    process.env.NODE_ENV === 'production' ? databaseCredentials.production :
        process.env.NODE_ENV === 'test' ? databaseCredentials.test :
            databaseCredentials.development

const cardPlatformSequel = CardPlatformSequel.create(config)

export default cardPlatformSequel;