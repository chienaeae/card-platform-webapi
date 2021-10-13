declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV?: string;
            PORT?: string
            CARD_PLATFORM_DB_USER?: string
            CARD_PLATFORM_DB_PASSWORD?: string
            CARD_PLATFORM_DB_HOST?: string
            CARD_PLATFORM_DB_DEV_DB_NAME?: string
            CARD_PLATFORM_DB_TEST_DB_NAME?: string
            CARD_PLATFORM_DB_PROD_DB_NAME?: string
        }
    }
}

export { };