import jwt, {SignOptions, VerifyOptions} from "jsonwebtoken";
import {ISigner} from "./interfaces/ISigner";
import {injectable} from "inversify";

@injectable()
export class JWTSigner implements ISigner {
    private readonly jwtSecret: string;
    private readonly verifyOption: VerifyOptions;
    private readonly signOption: SignOptions;

    constructor(secret: string, verifyOption: VerifyOptions, signOption: SignOptions) {
        this.jwtSecret = secret;
        this.verifyOption = verifyOption;
        this.signOption = signOption;
    }

    verify<payloadObject>(token: string): Promise<payloadObject> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.jwtSecret, this.verifyOption, (err, decoded) => {
                if (err) reject(err);
                resolve(decoded as payloadObject)
            });
        })

    }

    sign(payload: any): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, this.jwtSecret, this.signOption, (err, token) => {
                if (err) reject(err);
                resolve(token);
            })
        })

    }
}