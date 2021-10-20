import {Either} from "../../../../../core/logic/Either";
import {Result} from "../../../../../core/logic/Result";
import {UseCase} from "../../../../../core/domain/UseCase";
import {GenericAppError} from "../../../../../core/logic/AppError";
import {CardOrderingError} from "../../shared/CardOrderingError";

export interface PlaceOrderDTO{
    userId: string,
    cardIndex: number,
    price: number,
    type: string
}

export type PlaceOrderUseCaseResponse = Either<
    CardOrderingError.TraderDoesntExist |
    GenericAppError.UnexpectedError |
    Result<any>,
    Result<any>
>

export interface IPlaceOrderUseCase extends  UseCase<PlaceOrderDTO, Promise<PlaceOrderUseCaseResponse>>{

}