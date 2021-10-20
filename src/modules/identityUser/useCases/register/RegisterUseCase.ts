import {UseCase} from "../../../../core/domain/UseCase";
import {RegisterDTO} from "./RegisterDTO";
import {GenericAppError} from "../../../../core/logic/AppError";
import {Result} from "../../../../core/logic/Result";
import {Either, left, right} from "../../../../core/logic/Either";
import {IdentityEmail} from "../../domain/IdentityEmail";
import {IdentityPassword} from "../../domain/IdentityPassword";
import {IdentityUser} from "../../domain/IdentityUser";
import {IIdentityUserRepo} from "../../repos/interfaces/IIdentityUserRepo";
import {RegisterErrors} from "./RegisterError";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../../infra/inversify/types";

export type RegisterUseCaseResponse = Either<GenericAppError.UnexpectedError | RegisterErrors.AccountAlreadyExists | Result<any>, Result<void>>

@injectable()
export class RegisterUseCase implements UseCase<RegisterDTO, Promise<RegisterUseCaseResponse>>{
    @inject(TYPES.IdentityUserRepo)private identityUserRepo: IIdentityUserRepo;

    async execute(request?: RegisterDTO): Promise<RegisterUseCaseResponse> {
        const identityEmailOrError = IdentityEmail.create(request.email)
        const identityPasswordOrError = IdentityPassword.create({value: request.password});
        const combinedPropsResult = Result.combine([identityEmailOrError, identityPasswordOrError]);

        if(combinedPropsResult.isFailure){
            return left(Result.fail<void>(combinedPropsResult.error)) as RegisterUseCaseResponse;
        }

        const hashedPassword = await identityPasswordOrError.getValue().createHashedPassword();

        const identityUserOrError = IdentityUser.create({
            username: request.username,
            email: identityEmailOrError.getValue(),
            password: hashedPassword
        })

        if(identityUserOrError.isFailure){
            return left(Result.fail<void>(combinedPropsResult.error)) as RegisterUseCaseResponse;
        }

        const identityUser = identityUserOrError.getValue();

        const identityUserAlreadyExists = await this.identityUserRepo.exists(identityUser.email);

        if(identityUserAlreadyExists){
            return left(new RegisterErrors.AccountAlreadyExists(identityUser.email.value)) as RegisterUseCaseResponse;
        }

        try{
            await this.identityUserRepo.save(identityUser);
        }catch (err){
            return left(new GenericAppError.UnexpectedError(err)) as RegisterUseCaseResponse;
        }

        return right(Result.ok<void>()) as RegisterUseCaseResponse;
    }

}