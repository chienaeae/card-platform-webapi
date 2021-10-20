import {inject, injectable} from "inversify";
import {ITraderRepo} from "../../../trader/repos/interfaces/ITraderRepo";
import {TYPES} from "../../../../infra/inversify/types";
import {UserId} from "../../../identityUser/domain/UserId";
import {UniqueEntityID} from "../../../../core/domain/UniqueEntityID";
import {
    FetchTraderRequestDTO,
    FetchTraderResponseDTO,
    FetchTraderUseCaseResponse,
    IFetchTraderUseCase
} from "./interfaces/IFetchTraderUseCase";
import {Result} from "../../../../core/logic/Result";
import {left, right} from "../../../../core/logic/Either";
import {CardOrderingError} from "./CardOrderingError";


@injectable()
export class FetchTraderUseCase implements IFetchTraderUseCase {
    @inject(TYPES.TraderRepo) private traderRepo: ITraderRepo;

    async execute(request?: FetchTraderRequestDTO): Promise<FetchTraderUseCaseResponse> {
        const userId: UserId = UserId.create(new UniqueEntityID(request.userId));

        const trader = await this.traderRepo.findTraderByIdentityUserId(userId)

        if (!!trader == false){
            return left(new CardOrderingError.TraderDoesntExist())as FetchTraderUseCaseResponse
        }

        return right(Result.ok<FetchTraderResponseDTO>({traderId: trader.id.toString()})) as FetchTraderUseCaseResponse;
    }
}