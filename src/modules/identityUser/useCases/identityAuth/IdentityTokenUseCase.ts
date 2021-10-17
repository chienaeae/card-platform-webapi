import {UseCase} from "../../../../core/domain/UseCase";
import {Either, right} from "../../../../core/logic/Either";
import {Result} from "../../../../core/logic/Result";
import {IdentityUser} from "../../domain/IdentityUser";
import {ISigner} from "../../services/Authorization/interfaces/ISigner";
import {inject, injectable} from "inversify";
import {TYPES} from "../../../../infra/inversify/config/types";


export interface TokenResponseDTO {
    accessToken: string;
}

@injectable()
export class IdentityTokenUseCase implements UseCase<IdentityUser, Promise<Result<TokenResponseDTO>>> {
    @inject(TYPES.ISigner) private readonly jwtSigner: ISigner;

    async execute(request?: IdentityUser): Promise<Result<TokenResponseDTO>> {
        const token = await this.jwtSigner.sign({
            username: request.username,
            userId: request.id.toString(),
            email: request.email.value
        });
        return Result.ok<TokenResponseDTO>({accessToken: token});
    }

}