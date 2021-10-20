import {UseCaseError} from "../../../../core/logic/UseCaseError";
import {Result} from "../../../../core/logic/Result";

export namespace CardOrderingError{
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

    export class CardOrderProcessedFailure extends Result<UseCaseError>{
        constructor(orderingId: string) {
            super(false, {
                message: `pre ordering ${orderingId} process failed`
            } as UseCaseError);
        }
    }
}