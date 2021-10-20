import {Either} from "../../../../../core/logic/Either";
import {Result} from "../../../../../core/logic/Result";
import {UseCase} from "../../../../../core/domain/UseCase";
import {CardOrder} from "../../../domain/CardOrder";
import {CardOrderingError} from "../CardOrderingError";

export interface OrderProcessRequestDTO {
    cardOrder: CardOrder
}


export type OrderProcessUseCaseResponse = Either<
    Result<any> |
    CardOrderingError.CardOrderProcessedFailure,
    Result<void>>;


export interface IOrderProcessUseCase extends UseCase<OrderProcessRequestDTO, Promise<OrderProcessUseCaseResponse>> {

}