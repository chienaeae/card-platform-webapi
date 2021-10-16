import {UserId} from "../../../identityUser/domain/UserId";
import {Trader} from "../../domain/Trader";

export interface ITraderRepo{
    findTraderByIdentityUserId(userId: UserId): Promise<Trader>;

    exists(userId: UserId): Promise<boolean>;

    save(trader: Trader): Promise<void>;
}