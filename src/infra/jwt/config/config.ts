import {VerifyOptions, SignOptions} from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const jwtSecretCredentials = {
    development: {
        secret: process.env.DEV_JWT_SECRET,
        issuer: process.env.DEV_JWT_ISSUER
    },
    test: {
        secret: process.env.TEST_JWT_SECRET,
        issuer: process.env.TEST_JWT_ISSUER
    },
    production: {
        secret: process.env.PROD_JWT_SECRET,
        issuer: process.env.PROD_JWT_ISSUER
    }
}

export const {secret, issuer} = process.env.NODE_ENV === 'production' ? jwtSecretCredentials.production :
        process.env.NODE_ENV === 'test' ? jwtSecretCredentials.test :
            jwtSecretCredentials.development

export const verifyOptions:VerifyOptions = {
    algorithms: ['HS256'],
    issuer
};

export const signOptions: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '3h',
    issuer
};

