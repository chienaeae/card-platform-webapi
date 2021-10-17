import {IdentityUser} from "../domain/IdentityUser";
import Mapper from "../../../core/infra/Mapper";
import {IdentityEmail} from "../domain/IdentityEmail";
import {IdentityPassword} from "../domain/IdentityPassword";
import {UniqueEntityID} from "../../../core/domain/UniqueEntityID";

export class IdentityUserMap extends Mapper<IdentityUser> {
    public static toPersistence(identityUser: IdentityUser): any {
        return {
            user_id: identityUser.id.toString(),
            username: identityUser.username,
            user_email: identityUser.email.value,
            user_password: identityUser.password.value
        }
    }

    public static toDomain(raw: any): IdentityUser {
        const identityEmailOrError = IdentityEmail.create(raw.user_email);
        const identityPasswordOrError = IdentityPassword.create({
            value: raw.user_password,
            hashed: true
        });

        const identityUserOrError = IdentityUser.create({
            username: raw.username,
            email: identityEmailOrError.getValue(),
            password: identityPasswordOrError.getValue()
        }, new UniqueEntityID(raw.user_id))

        identityUserOrError.isFailure ? console.log(identityUserOrError.error) : '';

        return identityUserOrError.isSuccess ? identityUserOrError.getValue() : null;
    }
}