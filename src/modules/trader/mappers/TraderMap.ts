import Mapper from "../../../core/infra/Mapper";
import {Trader} from "../domain/Trader";
import {UserId} from "../../identityUser/domain/UserId";
import {UniqueEntityID} from "../../../core/domain/UniqueEntityID";

export class TraderMap extends Mapper<Trader> {
    public static toPersistence(trader: Trader): any {
        return {
            trader_id: trader.id.toString(),
            identity_user_id: trader.userId.id.toString()
        }
    }

    public static toDomain(raw: any): Trader {
        const userId = UserId.create(new UniqueEntityID(raw.identity_user_id));
        const traderOrError = Trader.create({
            userId
        }, new UniqueEntityID(raw.trader_id));

        traderOrError.isFailure ? console.log(traderOrError.error) : '';

        return traderOrError.isSuccess ? traderOrError.getValue() : null;

    }
}