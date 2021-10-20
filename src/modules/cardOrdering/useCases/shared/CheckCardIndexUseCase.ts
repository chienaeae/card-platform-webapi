import {inject, injectable} from "inversify";
import {
    CheckCardIndexCaseResponse,
    CheckCardIndexRequestDTO,
    ICheckCardIndexUseCase
} from "./interfaces/ICheckCardIndexUseCase";
import {TYPES} from "../../../../infra/inversify/types";
import {ICardRepo} from "../../../card/repos/interfaces/ICardRepo";
import {left, right} from "../../../../core/logic/Either";
import {Result} from "../../../../core/logic/Result";
import {CardOrderingError} from "./CardOrderingError";

@injectable()
export class CheckCardIndexUseCase implements ICheckCardIndexUseCase {
    @inject(TYPES.CardRepo) private cardRepo: ICardRepo;

    async execute(request?: CheckCardIndexRequestDTO): Promise<CheckCardIndexCaseResponse> {
        const cardIndex = request.cardIndex;

        const cardIndexExists = await this.cardRepo.cardIndexExists(cardIndex);

        if (!cardIndexExists) {
            return left(new CardOrderingError.CardIndexDoesntExist(cardIndex)) as CheckCardIndexCaseResponse;
        }
        return right(Result.ok<void>()) as CheckCardIndexCaseResponse;
    }

}