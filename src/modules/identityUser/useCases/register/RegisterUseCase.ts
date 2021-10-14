import {UseCase} from "../../../../core/domain/UseCase";
import {RegisterDTO} from "./RegisterDTO";
import {GenericAppError} from "../../../../core/logic/AppError";
import {Result} from "../../../../core/logic/Result";
import {Either, left, right} from "../../../../core/logic/Either";
import {IdentityEmail} from "../../domain/IdentityEmail";
import {IdentityPassword} from "../../domain/IdentityPassword";
import {IdentityUser} from "../../domain/IdentityUser";
import {IIdentityUserRepo} from "../../repos/IdentityUserRepo";
import {RegisterErrors} from "./RegisterError";

type Response = Either<GenericAppError.UnexpectedError | RegisterErrors.AccountAlreadyExists | Result<any>, Result<void>>

export class RegisterUseCase implements UseCase<RegisterDTO, Promise<Response>>{
    private identityUserRepo: IIdentityUserRepo;

    constructor(identityUserRepo: IIdentityUserRepo) {
        this.identityUserRepo = identityUserRepo
    }

    async execute(request?: RegisterDTO): Promise<Response> {
        const identityEmailOrError = IdentityEmail.create(request.email)
        const identityPasswordOrError = IdentityPassword.create({value: request.password});
        const combinedPropsResult = Result.combine([identityEmailOrError, identityPasswordOrError]);

        if(combinedPropsResult.isFailure){
            return left(Result.fail<void>(combinedPropsResult.error)) as Response;
        }

        const hashedPassword = await identityPasswordOrError.getValue().createHashedPassword();

        const identityUserOrError = IdentityUser.create({
            username: request.username,
            email: identityEmailOrError.getValue(),
            password: hashedPassword
        })

        if(identityUserOrError.isFailure){
            return left(Result.fail<void>(combinedPropsResult.error)) as Response;
        }

        const identityUser = identityUserOrError.getValue();

        const identityUserAlreadyExists = await this.identityUserRepo.exists(identityUser.email);

        if(identityUserAlreadyExists){
            return left(new RegisterErrors.AccountAlreadyExists(identityUser.email.value)) as Response;
        }

        try{
            await this.identityUserRepo.save(identityUser);
        }catch (err){
            return left(new GenericAppError.UnexpectedError(err)) as Response;
        }

        return right(Result.ok<void>()) as Response;
    }

}