import {GenericAppError} from "../../../../core/logic/AppError";
import {Result} from "../../../../core/logic/Result";
import {Either, left, right} from "../../../../core/logic/Either";
import {CreateTraderDTO} from "./CreateTraderDTO";
import {UseCase} from "../../../../core/domain/UseCase";
import {Trader} from "../../domain/Trader";
import {UserId} from "../../../identityUser/domain/UserId";
import {UniqueEntityID} from "../../../../core/domain/UniqueEntityID";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../../infra/inversify/types";
import {TraderRepo} from "../../repos/TraderRepo";
import {ITraderRepo} from "../../repos/interfaces/ITraderRepo";
import {CreateTraderError} from "./CreateTraderError";

export type CreateTraderUseCaseResponse = Either<CreateTraderError.TraderAlreadyExists | GenericAppError.UnexpectedError | Result<any>, Result<void>>

@injectable()
export class CreateTraderUseCase implements UseCase<CreateTraderDTO, Promise<CreateTraderUseCaseResponse>>{
    @inject(TYPES.TraderRepo)private traderRepo: ITraderRepo;

    async execute(request?: CreateTraderDTO): Promise<CreateTraderUseCaseResponse> {
        const traderOrError = Trader.create({
            userId: UserId.create(new UniqueEntityID(request.userId))
        });
        if(traderOrError.isFailure){
            return left(Result.fail<void>(traderOrError.error.toString())) as CreateTraderUseCaseResponse
        }

        const trader = traderOrError.getValue();

        const traderAlreadyExists = await this.traderRepo.exists(trader.userId);

        if(traderAlreadyExists){
            return left(new CreateTraderError.TraderAlreadyExists()) as CreateTraderUseCaseResponse;
        }

        try{
            await this.traderRepo.save(trader);
        }catch (err){
            return left(new GenericAppError.UnexpectedError(err)) as CreateTraderUseCaseResponse;
        }

        return right(Result.ok<void>()) as CreateTraderUseCaseResponse;

    }

}