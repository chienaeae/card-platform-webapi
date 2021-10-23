import {GetCardsResponseDTO, GetCardsUseCaseResponse, IGetCardsUseCase} from "./interfaces/IGetCardsUseCase";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../../infra/inversify/types";
import {ICardRepo} from "../../repos/interfaces/ICardRepo";
import {left, right} from "../../../../core/logic/Either";
import {GenericAppError} from "../../../../core/logic/AppError";
import {GetOrderTradesUseCaseResponse} from "../../../cardOrdering/useCases/getOrderTrades/interfaces/IGetOrderTradesUseCase";
import {Result} from "../../../../core/logic/Result";

@injectable()
export class GetCardsUseCase implements IGetCardsUseCase {
    private static readonly GET_CARD_COUNT_LIMIT: number = 50;
    @inject(TYPES.CardRepo) private cardRepo: ICardRepo;

    async execute(request?: void): Promise<GetCardsUseCaseResponse> {
        // fetch cards
        try {
            const cardCollection = await this.cardRepo.findCards(GetCardsUseCase.GET_CARD_COUNT_LIMIT);
            return right(Result.ok<GetCardsResponseDTO>({
                cards: cardCollection.map(card => {
                    return {
                        id: card.id.toString(),
                        cardName: card.cardName,
                        cardIndex: card.cardIndex
                    }
                })
            }))
        } catch (err) {
            // fetch cards failed !!
            console.log(err);
            return left(new GenericAppError.UnexpectedError(err)) as GetCardsUseCaseResponse
        }

    }
}