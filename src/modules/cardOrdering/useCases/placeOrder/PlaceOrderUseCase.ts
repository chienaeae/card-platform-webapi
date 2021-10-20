import {IPlaceOrderUseCase, PlaceOrderDTO, PlaceOrderUseCaseResponse} from "./interfaces/IPlaceOrderUseCase";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../../infra/inversify/types";
import {FetchTraderResponseDTO, IFetchTraderUseCase} from "../shared/interfaces/IFetchTraderUseCase";
import {left, right} from "../../../../core/logic/Either";
import {Result} from "../../../../core/logic/Result";
import {ICardOrderRepo} from "../../repos/interfaces/ICardOrderRepo";
import {CardOrder} from "../../domain/CardOrder";
import {CardOrderPrice} from "../../domain/CardOrderPrice";
import {CardOrderStatus} from "../../domain/CardOrderStatus";
import {CardOrderType} from "../../domain/CardOrderType";
import {RegisterUseCaseResponse} from "../../../identityUser/useCases/register/RegisterUseCase";
import {TraderId} from "../../../trader/domain/TraderId";
import {UniqueEntityID} from "../../../../core/domain/UniqueEntityID";
import {GenericAppError} from "../../../../core/logic/AppError";
import {CheckCardIndexRequestDTO, ICheckCardIndexUseCase} from "../shared/interfaces/ICheckCardIndexUseCase";

@injectable()
export class PlaceOrderUseCase implements IPlaceOrderUseCase {
    private static readonly PLACE_ORDER_DEFAULT_TYPE: number = 0

    @inject(TYPES.FetchTraderUseCase) private fetchTraderUseCase: IFetchTraderUseCase;
    @inject(TYPES.CardOrderRepo) private cardOrderRepo: ICardOrderRepo;
    @inject(TYPES.CheckCardIndexUseCase) private checkCardIndexUseCase: ICheckCardIndexUseCase;

    async execute(request?: PlaceOrderDTO): Promise<PlaceOrderUseCaseResponse> {
        // fetch trader id
        const fetchTraderResult = await this.fetchTraderUseCase.execute({
            userId: request.userId
        });
        if (fetchTraderResult.isLeft()) {
            return fetchTraderResult;
        }
        const fetchTraderResponseDTO: FetchTraderResponseDTO = fetchTraderResult.value.getValue()
        // Check card exists
        const placeOrderCardIndex = request.cardIndex;
        if (typeof placeOrderCardIndex !== 'number' && typeof placeOrderCardIndex !== 'string'){
            return left(Result.fail<void>('invalid card index'))  as PlaceOrderUseCaseResponse;
        }
        const cardIndexCheckedResult = await this.checkCardIndexUseCase.execute({cardIndex: placeOrderCardIndex});
        if (cardIndexCheckedResult.isLeft()){
            return cardIndexCheckedResult;
        }
        // Create card order
        const cardOrderTraderId = TraderId.create(new UniqueEntityID(fetchTraderResponseDTO.traderId));
        const cardOrderPriceOrError = CardOrderPrice.create(request.price);
        const cardOrderStatusOrError = CardOrderStatus.create(PlaceOrderUseCase.PLACE_ORDER_DEFAULT_TYPE);
        const cardOrderTypeOrError = CardOrderType.create(request.type);
        const combinedPropsResult = Result.combine([cardOrderPriceOrError, cardOrderStatusOrError, cardOrderTypeOrError])
        if (combinedPropsResult.isFailure) {
            return left(Result.fail<void>(combinedPropsResult.error)) as PlaceOrderUseCaseResponse;
        }
        const cardOrderOrError = CardOrder.create({
            traderId: cardOrderTraderId,
            cardIndex: placeOrderCardIndex,
            price: cardOrderPriceOrError.getValue(),
            status: cardOrderStatusOrError.getValue(),
            type: cardOrderTypeOrError.getValue(),
            orderedTime: new Date()
        });
        if(cardOrderOrError.isFailure){
            return left(Result.fail<void>(cardOrderOrError.error.toString())) as PlaceOrderUseCaseResponse;
        }
        const cardOrder = cardOrderOrError.getValue();
        try{
            await this.cardOrderRepo.save(cardOrder)
        }catch(err){
            // save card order failed !!
            console.log(err);
            return left(new GenericAppError.UnexpectedError(err)) as PlaceOrderUseCaseResponse
        }

        return right(Result.ok<void>()) as PlaceOrderUseCaseResponse;
    }
}