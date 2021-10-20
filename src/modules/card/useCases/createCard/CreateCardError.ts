import {UseCaseError} from "../../../../core/logic/UseCaseError";
import {Result} from "../../../../core/logic/Result";

export namespace CreateCardError{
    export class CardNameUsed extends Result<UseCaseError>{
        constructor(cardName: string) {
            super(false, {
                message: `${cardName} has been used`
            }as UseCaseError);
        }
    }
}