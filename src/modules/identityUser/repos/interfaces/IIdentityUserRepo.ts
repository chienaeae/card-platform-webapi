import {IdentityEmail} from "../../domain/IdentityEmail";
import {IdentityUser} from "../../domain/IdentityUser";

export interface IIdentityUserRepo {
    findIdentityUserByEmail(email: IdentityEmail): Promise<IdentityUser>;

    findIdentityUserByUsername(username: string): Promise<IdentityUser>;

    exists(email: IdentityEmail): Promise<boolean>;

    save(identityUser: IdentityUser): Promise<void>;
}