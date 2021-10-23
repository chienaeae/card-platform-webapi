import {Either} from "../../../../../core/logic/Either";
import {Result} from "../../../../../core/logic/Result";
import {UseCaseError} from "../../../../../core/logic/UseCaseError";
import {UseCase} from "../../../../../core/domain/UseCase";


interface Card{
    id: string,
    cardName: string,
    cardIndex: number
}

export interface GetCardsResponseDTO{
    cards: Array<Card>
}


export type GetCardsUseCaseResponse = Either<
    Result<UseCaseError> |
    Result<any>,
    Result<GetCardsResponseDTO>>

export interface IGetCardsUseCase extends UseCase<void, Promise<GetCardsUseCaseResponse>> {

}