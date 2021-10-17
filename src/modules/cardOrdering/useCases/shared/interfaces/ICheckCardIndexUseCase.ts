import {Either} from "../../../../../core/logic/Either";
import {PlaceOrderError} from "../../placeOrder/PlaceOrderError";
import {Result} from "../../../../../core/logic/Result";
import {UseCase} from "../../../../../core/domain/UseCase";

export interface CheckCardIndexRequestDTO {
    cardIndex: number
}


export type CheckCardIndexCaseResponse = Either<PlaceOrderError.CardIndexDoesntExist | Result<any>, Result<void>>;


export interface ICheckCardIndexUseCase extends UseCase<CheckCardIndexRequestDTO, Promise<CheckCardIndexCaseResponse>> {

}