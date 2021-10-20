import {ValueObject} from "../../../core/domain/ValueObject";
import {Result} from "../../../core/logic/Result";
import {Guard} from "../../../core/logic/Guard";

interface IdentityEmailProps{
    value: string;
}

export class IdentityEmail extends  ValueObject<IdentityEmailProps>{
    get value(): string{
        return this.props.value;
    }

    private constructor(props: IdentityEmailProps) {
        super(props);
    }

    public static create(email: string): Result<IdentityEmail>{
        const guardResult = Guard.againstNullOrUndefined(email, 'email');
        if(!guardResult.succeeded){
            return Result.fail<IdentityEmail>(guardResult.message);
        }else{
            return Result.ok<IdentityEmail>(new IdentityEmail({value: email}));
        }
    }
}