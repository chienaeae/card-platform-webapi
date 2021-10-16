import {IdentityPassword} from "./IdentityPassword";
import {IdentityEmail} from "./IdentityEmail";
import {UniqueEntityID} from "../../../core/domain/UniqueEntityID";
import {UserId} from "./UserId";
import {Result} from "../../../core/logic/Result";
import {Guard} from "../../../core/logic/Guard";
import {AggregateRoot} from "../../../core/domain/AggregateRoot";
import {IdentityUserCreatedEvent} from "./events/identityUserCreatedEvent";

interface IdentityUserProps {
    username?: string;
    email: IdentityEmail;
    password: IdentityPassword;
}

export class IdentityUser extends AggregateRoot<IdentityUserProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get userId(): UserId {
        return UserId.create(this.id);
    }

    get email(): IdentityEmail {
        return this.props.email;
    }

    get password(): IdentityPassword {
        return this.props.password;
    }

    get username(): string {
        return this.props.username;
    }

    set username(value: string) {
        this.props.username = value;
    }

    private constructor(props: IdentityUserProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: IdentityUserProps, id?: UniqueEntityID): Result<IdentityUser> {
        const guardedProps = [
            {argument: props.email, argumentName: 'email'}
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<IdentityUser>(guardResult.message);
        } else {
            const identityUser = new IdentityUser({
                ...props,
                username: props.username ? props.username : ''
            }, id);

            const idWasProvided = !!id;

            if (!idWasProvided) {
                identityUser.addDomainEvent(new IdentityUserCreatedEvent(identityUser));
            }

            return Result.ok<IdentityUser>(identityUser);
        }
    }
}