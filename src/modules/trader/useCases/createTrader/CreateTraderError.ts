import {UseCaseError} from "../../../../core/logic/UseCaseError";
import {Result} from "../../../../core/logic/Result";

export namespace CreateTraderError{
    export class TraderAlreadyExists extends Result<UseCaseError>{
        constructor() {
            super(false, {
                message: `trader has already created under this user`
            } as UseCaseError);
        }
    }
}