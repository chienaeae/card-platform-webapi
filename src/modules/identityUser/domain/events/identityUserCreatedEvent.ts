import {IDomainEvent} from "../../../../core/domain/events/IDomainEvent";
import {UniqueEntityID} from "../../../../core/domain/UniqueEntityID";
import {IdentityUser} from "../IdentityUser";

export class IdentityUserCreatedEvent implements IDomainEvent {
    public dateTimeOccurred: Date;
    public identityUser: IdentityUser;

    constructor(identityUser: IdentityUser) {
        this.dateTimeOccurred = new Date();
        this.identityUser = identityUser;
    }

    getAggregateId(): UniqueEntityID {
        return this.identityUser.id;
    }
}