import {Either} from "../../../../../core/logic/Either";
import {Result} from "../../../../../core/logic/Result";
import {UseCase} from "../../../../../core/domain/UseCase";
import {PlaceOrderError} from "../../placeOrder/PlaceOrderError";

export interface FetchTraderRequestDTO{
    userId: string
}

export interface FetchTraderResponseDTO{
    traderId: string
}

export type FetchTraderUseCaseResponse = Either<PlaceOrderError.TraderDoesntExist | Result<any>, Result<FetchTraderResponseDTO>>;


export interface IFetchTraderUseCase extends  UseCase<FetchTraderRequestDTO, Promise<FetchTraderUseCaseResponse>>{

}