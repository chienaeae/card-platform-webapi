import * as path from 'path';
import {OAS3Options} from "swagger-jsdoc";

export const options: OAS3Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "卡片交易平台 API",
            version: "1.0.0",
            description: "A simple Express Library API",
        },
        servers: [
            {
                description: "開發環境",
                url: "http://localhost:8000/api/v1",
            },
            {
                description: "生產環境",
                url: "https://card-platform.phillyzone.info/api/v1"
            }
        ],
    },
    apis: [
        path.join(__dirname, '..', '*.ts'),
        path.join(__dirname, '..', '*.js'),
        `${__dirname}/*.yml`
    ],
};