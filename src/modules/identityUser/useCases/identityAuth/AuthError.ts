import {UseCaseError} from "../../../../core/logic/UseCaseError";
import {Result} from "../../../../core/logic/Result";

export namespace AuthErrors{
    export class EmailNotExists extends Result<UseCaseError>{
        constructor(email: string) {
            super(false, {
                message: `The email [${email}] doesnt exist`
            } as UseCaseError);
        }
    }

    export class PasswordNotMatches extends Result<UseCaseError>{
        constructor() {
            super(false, {
                message: `The password doesnt match this account`
            } as UseCaseError);
        }
    }
}