import {Either} from "../../../../../core/logic/Either";
import {Result} from "../../../../../core/logic/Result";
import {UseCase} from "../../../../../core/domain/UseCase";
import {CardOrderingError} from "../CardOrderingError";

export interface CheckCardIndexRequestDTO {
    cardIndex: number
}


export type CheckCardIndexCaseResponse = Either<CardOrderingError.CardIndexDoesntExist | Result<any>, Result<void>>;


export interface ICheckCardIndexUseCase extends UseCase<CheckCardIndexRequestDTO, Promise<CheckCardIndexCaseResponse>> {

}