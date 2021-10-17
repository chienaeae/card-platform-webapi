import {Either} from "../../../../../core/logic/Either";
import {PlaceOrderError} from "../PlaceOrderError";
import {Result} from "../../../../../core/logic/Result";
import {FetchTraderRequestDTO, FetchTraderResponseDTO, FetchTraderUseCaseResponse} from "../../shared/interfaces/IFetchTraderUseCase";
import {UseCase} from "../../../../../core/domain/UseCase";
import {GenericAppError} from "../../../../../core/logic/AppError";

export interface PlaceOrderDTO{
    userId: string,
    cardIndex: number,
    price: number,
    type: string
}

export type PlaceOrderUseCaseResponse = Either<
    PlaceOrderError.TraderDoesntExist |
    GenericAppError.UnexpectedError |
    Result<any>,
    Result<any>
>

export interface IPlaceOrderUseCase extends  UseCase<PlaceOrderDTO, Promise<PlaceOrderUseCaseResponse>>{

}