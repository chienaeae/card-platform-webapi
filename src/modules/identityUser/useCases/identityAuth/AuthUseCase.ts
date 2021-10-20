import {UseCase} from "../../../../core/domain/UseCase";
import {AuthDTO} from "./AuthDTO";
import {Either, left, right} from "../../../../core/logic/Either";
import {Result} from "../../../../core/logic/Result";
import {IdentityEmail} from "../../domain/IdentityEmail";
import {IdentityPassword} from "../../domain/IdentityPassword";
import {IIdentityUserRepo} from "../../repos/interfaces/IIdentityUserRepo";
import {IdentityUser} from "../../domain/IdentityUser";
import {AuthErrors} from "./AuthError";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../../infra/inversify/types";

export type AuthResponse = Either<AuthErrors.EmailNotExists |
    AuthErrors.PasswordNotMatches |
    Result<any>,
    Result<IdentityUser>
>

@injectable()
export class AuthUseCase implements UseCase<AuthDTO, Promise<AuthResponse>>{
    @inject(TYPES.IdentityUserRepo)private identityUserRepo: IIdentityUserRepo;

    async execute(request?: AuthDTO): Promise<AuthResponse> {
        const identityEmailOrError = IdentityEmail.create(request.email)
        const identityPasswordOrError = IdentityPassword.create({value: request.password});
        const combinedPropsResult = Result.combine([identityEmailOrError, identityPasswordOrError]);

        if(combinedPropsResult.isFailure){
            return left(Result.fail<void>(combinedPropsResult.error)) as AuthResponse;
        }
        const requestEmail: IdentityEmail = identityEmailOrError.getValue();
        const requestPassword: IdentityPassword = identityPasswordOrError.getValue();

        const identityUser: IdentityUser = await this.identityUserRepo.findIdentityUserByEmail(requestEmail);
        if(!!identityUser === false){
            return left(new AuthErrors.EmailNotExists(requestEmail.value)) as AuthResponse;
        }
        const comparedResult: boolean = await identityUser.password.comparePassword(requestPassword.value)
        if(!comparedResult){
            return left(new AuthErrors.PasswordNotMatches()) as AuthResponse;
        }
        return right(Result.ok(identityUser)) as AuthResponse;
    }
}