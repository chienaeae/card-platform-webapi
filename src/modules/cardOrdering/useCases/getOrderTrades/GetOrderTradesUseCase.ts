import {inject, injectable} from "inversify";
import {TYPES} from "../../../../infra/inversify/types";
import {left, right} from "../../../../core/logic/Either";
import {GenericAppError} from "../../../../core/logic/AppError";
import {Result} from "../../../../core/logic/Result";
import {
    GetOrderTradeResponseDTO, GetOrderTradesQuery, GetOrderTradesUseCaseResponse,
    IGetOrderTradesUseCase
} from "./interfaces/IGetOrderTradesUseCase";
import {ICardTradeRepo} from "../../repos/interfaces/ICardTradeRepo";
import {ICheckCardIndexUseCase} from "../shared/interfaces/ICheckCardIndexUseCase";
import {CardTrade} from "../../domain/CardTrade";

@injectable()
export class GetOrderTradesUseCase implements IGetOrderTradesUseCase {
    private static readonly GET_TRADES_COUNT: number = 50;
    @inject(TYPES.CardTradeRepo) private cardTradeRepo: ICardTradeRepo;
    @inject(TYPES.CheckCardIndexUseCase) private checkCardIndexUseCase: ICheckCardIndexUseCase;

    async execute(request?: GetOrderTradesQuery): Promise<GetOrderTradesUseCaseResponse> {
        // Check card exists
        const cardIndex = parseInt(request.cardIndex);
        if (typeof cardIndex !== 'number') {
            return left(Result.fail<void>('invalid card index')) as GetOrderTradesUseCaseResponse;
        }
        const cardIndexCheckedResult = await this.checkCardIndexUseCase.execute({cardIndex: cardIndex});
        if (cardIndexCheckedResult.isLeft()) {
            return cardIndexCheckedResult;
        }
        // fetch cardTrades
        try {
            const cardTradeCollection: CardTrade[] =
                await this.cardTradeRepo.findLatestCardTradeByCardIndex(GetOrderTradesUseCase.GET_TRADES_COUNT, cardIndex)
            // mapping from CardTrade[] to GetOrderTradeResponseDTO
            return right(Result.ok<GetOrderTradeResponseDTO>({
                trades: cardTradeCollection.map(cardTrade => {
                    return {
                        id: cardTrade.id.toString(),
                        price: cardTrade.tradePrice,
                        cardIndex: cardIndex
                    }
                })
            })) as GetOrderTradesUseCaseResponse
        } catch (err) {
            // fetch card orders failed !!
            console.log(err);
            return left(new GenericAppError.UnexpectedError(err)) as GetOrderTradesUseCaseResponse
        }
    }
}