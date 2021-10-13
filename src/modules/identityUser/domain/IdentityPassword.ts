import {ValueObject} from "../../../core/domain/ValueObject";
import {Result} from "../../../core/logic/Result";
import {Guard} from "../../../core/logic/Guard";
import bcrypt from "bcrypt";


interface IdentityPasswordProps {
    value: string;
    hashed?: boolean;
}

export class IdentityPassword extends ValueObject<IdentityPasswordProps> {
    get value(): string {
        return this.props.value;
    }

    private constructor(props: IdentityPasswordProps) {
        super(props);
    }

    public async comparePassword(plainTextPassword: string): Promise<boolean>{
        let hashed: string;
        if(this.isAlreadyHashed()){
            hashed = this.props.value;
            return this.bcryptCompare(plainTextPassword, hashed);
        }else{
            return this.props.value === plainTextPassword;
        }
    }

    private bcryptCompare(plainText: string, hashed: string): Promise<boolean>{
        return new Promise((resolve, reject) => {
            bcrypt.compare(plainText, hashed, (err, compareResult) => {
                if(err) return resolve(false);
                return resolve(compareResult);
            })
        })
    }

    public isAlreadyHashed (): boolean {
        return this.props.hashed;
    }

    private hashPassword(password:string): Promise<string>{
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if(err) return reject(err);
                resolve(hash)
            })
        })
    }

    public getHashedValue():Promise<string>{
        return new Promise((resolve) => {
            if(this.isAlreadyHashed()){
                return resolve(this.props.value);
            }else{
                return resolve(this.hashPassword(this.props.value))
            }
        })
    }

    public static isAppropriateLength(value: string): boolean{
        return value.length >= 8;
    }

    public async createHashedPassword(): Promise<IdentityPassword>{
        return new IdentityPassword({
            value: await this.getHashedValue(),
            hashed: true
        })
    }

    public static create(props: IdentityPasswordProps): Result<IdentityPassword>{
        const guardResult = Guard.againstNullOrUndefined(props.value, 'password');

        if(!guardResult.succeeded){
            return Result.fail<IdentityPassword>(guardResult.message);
        }else{
            if(!props.hashed){
                if(!this.isAppropriateLength(props.value)){
                    return Result.fail<IdentityPassword>('Password doesnt meet criteria [1 uppercase, 1 lowercase, one digit or symbol and 8 chars min].');
                }
            }

            const password = new IdentityPassword({
                value: props.value,
                hashed: !!props.hashed === true
            })

            return Result.ok<IdentityPassword>(password)
        }
    }
}