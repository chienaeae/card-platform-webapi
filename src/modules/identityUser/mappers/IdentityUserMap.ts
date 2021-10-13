import {IdentityUser} from "../domain/IdentityUser";
import Mapper from "../../../core/infra/Mapper";
import {IdentityEmail} from "../domain/IdentityEmail";
import {IdentityPassword} from "../domain/IdentityPassword";
import {UniqueEntityID} from "../../../core/domain/UniqueEntityID";

export class IdentityUserMap extends Mapper<IdentityUser> {
    public static async toPersistence(identityUser: IdentityUser): Promise<any> {
        return {
            user_id: identityUser.id.toString(),
            username: identityUser.username,
            user_email: identityUser.email.value,
            user_password: await identityUser.password.getHashedValue()
        }
    }

    public static toDomain(raw: any): IdentityUser {
        const identityEmailOrError = IdentityEmail.create(raw.user_email);
        const identityPasswordOrError = IdentityPassword.create(raw.user_password);

        const identityUserOrError = IdentityUser.create({
            username: raw.username,
            email: identityEmailOrError.getValue(),
            password: identityPasswordOrError.getValue()
        }, new UniqueEntityID(raw.user_id))

        identityUserOrError.isFailure ? console.log(identityUserOrError.error) : '';

        return identityUserOrError.isSuccess ? identityUserOrError.getValue() : null;
    }
}