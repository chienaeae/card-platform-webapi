import {UseCaseError} from "../../../../core/logic/UseCaseError";
import {Result} from "../../../../core/logic/Result";

export namespace PlaceOrderError{
    export class TraderDoesntExist extends Result<UseCaseError>{
        constructor() {
            super(false, {
                message: `trader doesnt exist under this user`
            } as UseCaseError);
        }
    }

    export class CardIndexDoesntExist extends  Result<UseCaseError>{
        constructor(cardIndex: number) {
            super(false, {
                message: `cardIndex ${cardIndex} doesnt exist`
            } as UseCaseError);
        }
    }
}