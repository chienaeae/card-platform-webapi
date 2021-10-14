import {UseCase} from "../../../../core/domain/UseCase";
import {AuthDTO} from "./AuthDTO";
import {Either, left, right} from "../../../../core/logic/Either";
import {Result} from "../../../../core/logic/Result";
import {IdentityEmail} from "../../domain/IdentityEmail";
import {IdentityPassword} from "../../domain/IdentityPassword";
import {IIdentityUserRepo} from "../../repos/IdentityUserRepo";
import {IdentityUser} from "../../domain/IdentityUser";
import {AuthErrors} from "./AuthError";
import {RegisterErrors} from "../register/RegisterError";

type Response = Either<AuthErrors.EmailNotExists | AuthErrors.PasswordNotMatches | Result<any>,  Result<IdentityUser>>

export class AuthUseCase implements UseCase<AuthDTO, Promise<Response>>{

    private identityUserRepo: IIdentityUserRepo;

    constructor(identityUserRepo: IIdentityUserRepo) {
        this.identityUserRepo = identityUserRepo
    }

    async execute(request?: AuthDTO): Promise<Response> {
        const identityEmailOrError = IdentityEmail.create(request.email)
        const identityPasswordOrError = IdentityPassword.create({value: request.password});
        const combinedPropsResult = Result.combine([identityEmailOrError, identityPasswordOrError]);

        if(combinedPropsResult.isFailure){
            return left(Result.fail<void>(combinedPropsResult.error)) as Response;
        }
        const requestEmail: IdentityEmail = identityEmailOrError.getValue();
        const requestPassword: IdentityPassword = identityPasswordOrError.getValue();

        const identityUser: IdentityUser = await this.identityUserRepo.findIdentityUserByEmail(requestEmail);
        if(!!identityUser === false){
            return left(new AuthErrors.EmailNotExists(requestEmail.value)) as Response;
        }
        const comparedResult: boolean = await identityUser.password.comparePassword(requestPassword.value)
        if(!comparedResult){
            return left(new AuthErrors.PasswordNotMatches()) as Response;
        }
        return right(Result.ok<IdentityUser>(identityUser)) as Response;
    }
}