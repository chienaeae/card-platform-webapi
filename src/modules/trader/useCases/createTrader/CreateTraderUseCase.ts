import {GenericAppError} from "../../../../core/logic/AppError";
import {Result} from "../../../../core/logic/Result";
import {Either, left} from "../../../../core/logic/Either";
import {CreateTraderDTO} from "./CreateTraderDTO";
import {UseCase} from "../../../../core/domain/UseCase";
import {Trader} from "../../domain/Trader";
import {UserId} from "../../../identityUser/domain/UserId";
import {UniqueEntityID} from "../../../../core/domain/UniqueEntityID";

export type CreateTraderUseCaseResponse = Either<GenericAppError.UnexpectedError | Result<any>, Result<void>>

export class CreateTraderUseCase implements UseCase<CreateTraderDTO, Promise<CreateTraderUseCaseResponse>>{

    async execute(request?: CreateTraderDTO): Promise<CreateTraderUseCaseResponse> {
        const traderOrError = Trader.create({
            userId: UserId.create(new UniqueEntityID(request.userId))
        });

        if(traderOrError.isFailure){
            return left(Result.fail<void>(traderOrError.error)) as CreateTraderUseCaseResponse
        }

        const trader = traderOrError.getValue();
    }

}