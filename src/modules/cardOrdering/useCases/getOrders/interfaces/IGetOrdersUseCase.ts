import {Either} from "../../../../../core/logic/Either";
import {Result} from "../../../../../core/logic/Result";
import {UseCase} from "../../../../../core/domain/UseCase";
import {CardOrderingError} from "../../shared/CardOrderingError";

export interface GetOrdersUseCaseRequestDTO{
    userId: string
}

interface cardOrderInfo{
    id: string,
    price: number,
    cardIndex: number,
    status: number,
    type: string,
    orderedTime: number
}

export interface GetOrdersResponseDTO{
    cardOrders: Array<cardOrderInfo>
}


export type GetOrderUseCaseResponse = Either<
    CardOrderingError.TraderDoesntExist |
    Result<any>,
    Result<GetOrdersResponseDTO>
>

export interface IGetOrdersUseCase extends UseCase<GetOrdersUseCaseRequestDTO, GetOrderUseCaseResponse>{

}