import {Either, left, right} from "../../../../core/logic/Either";
import {GenericAppError} from "../../../../core/logic/AppError";
import {Result} from "../../../../core/logic/Result";
import {CreateCardError} from "./CreateCardError";
import {UseCase} from "../../../../core/domain/UseCase";
import {CreateCardDTO} from "./CreateCardDTO";
import {ICardRepo} from "../../repos/interfaces/ICardRepo";
import {Card} from "../../domain/Card";
import {CreateTraderUseCaseResponse} from "../../../trader/useCases/createTrader/CreateTraderUseCase";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../../infra/inversify/types";

export type CreateCardUseCaseResponse = Either<CreateCardError.CardNameUsed | GenericAppError.UnexpectedError | Result<any>, Result<void>>

@injectable()
export class CreateCardUseCase implements UseCase<CreateCardDTO, CreateCardUseCaseResponse> {
    @inject(TYPES.CardRepo) private cardRepo: ICardRepo;

    async execute(request?: CreateCardDTO): Promise<CreateCardUseCaseResponse> {
        const existsCardCount = await this.cardRepo.count()
        const cardOrError = Card.create({
            cardName: request.cardName,
            cardIndex: existsCardCount + 1
        })

        if (cardOrError.isFailure) {
            return left(Result.fail<void>(cardOrError.error.toString())) as CreateCardUseCaseResponse
        }

        const card = cardOrError.getValue();
        const cardAlreadyExists = await this.cardRepo.exists(card.cardName)
        if (cardAlreadyExists) {
            return left(new CreateCardError.CardNameUsed(card.cardName)) as CreateCardUseCaseResponse;
        }

        try {
            await this.cardRepo.save(card);
        } catch (err) {
            return left(new GenericAppError.UnexpectedError(err)) as CreateCardUseCaseResponse;
        }

        return right(Result.ok<void>()) as CreateTraderUseCaseResponse;
    }

}