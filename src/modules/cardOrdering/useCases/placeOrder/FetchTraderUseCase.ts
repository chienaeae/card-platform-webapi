import {CreateTraderDTO} from "./FetchTraderDTO";
import {Either} from "../../../../core/logic/Either";
import {Result} from "../../../../core/logic/Result";
import {UseCase} from "../../../../core/domain/UseCase";
import {TraderId} from "../../../trader/domain/TraderId";
import {inject, injectable} from "inversify";
import {ITraderRepo} from "../../../trader/repos/interfaces/ITraderRepo";
import {Trader} from "../../../trader/domain/Trader";
import {TYPES} from "../../../../infra/inversify/config/types";
import {UserId} from "../../../identityUser/domain/UserId";
import {UniqueEntityID} from "../../../../core/domain/UniqueEntityID";

export type FetchTraderUseCaseResponse = Either<Result<any>, Result<Trader>>;

@injectable()
export class FetchTraderUseCase implements UseCase<CreateTraderDTO, Promise<FetchTraderUseCaseResponse>>{
    @inject(TYPES.TraderRepo)private traderRepo: ITraderRepo;

    async execute(request?: CreateTraderDTO): Promise<Promise<TraderId>> | Promise<TraderId> {
        const userId: UserId = UserId.create(new UniqueEntityID(request.userId));

        await this.traderRepo.findTraderByIdentityUserId(userId)
        return undefined;
    }


}