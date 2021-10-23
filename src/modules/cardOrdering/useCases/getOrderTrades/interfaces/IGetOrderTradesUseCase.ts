import {Either} from "../../../../../core/logic/Either";
import {Result} from "../../../../../core/logic/Result";
import {UseCase} from "../../../../../core/domain/UseCase";
import {CardOrderingError} from "../../shared/CardOrderingError";

export interface GetOrderTradesQuery{
    cardIndex?: string
}

interface Trade{
    id: string,
    price: number,
    cardIndex: number,
    buyOrderId: string,
    sellOrderId: string
}

export interface GetOrderTradeResponseDTO{
    trades: Array<Trade>
}


export type GetOrderTradesUseCaseResponse = Either<
    CardOrderingError.CardIndexDoesntExist |
    Result<any>,
    Result<GetOrderTradeResponseDTO>
    >

export interface IGetOrderTradesUseCase extends UseCase<GetOrderTradesQuery, GetOrderTradesUseCaseResponse>{

}