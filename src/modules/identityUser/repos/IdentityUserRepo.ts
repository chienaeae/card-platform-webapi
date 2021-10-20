import {IdentityEmail} from "../domain/IdentityEmail";
import {IdentityUser} from "../domain/IdentityUser";
import {IdentityUserMap} from "../mappers/IdentityUserMap";
import {IIdentityUserRepo} from "./interfaces/IIdentityUserRepo";
import {injectable} from "inversify";
import {IdentityUser as IdentityUserModel} from "../../../reference/card-platform-library/src/modules/sequlize/models/identityUser/IdentityUser.model";

@injectable()
export class IdentityUserRepo implements IIdentityUserRepo {
    private model: typeof IdentityUserModel;

    constructor(model: typeof IdentityUserModel) {
        this.model = model;
    }

    private createBaseQuery() {
        const {model} = this;
        return {
            where: {}
        }
    }

    public async exists(email: IdentityEmail): Promise<boolean> {
        const baseQuery = this.createBaseQuery();
        baseQuery.where['user_email'] = email.value.toString();
        const identityUser = await this.model.findOne(baseQuery);
        return !!identityUser == true;
    }

    public async findIdentityUserByEmail(email: IdentityEmail): Promise<IdentityUser> {
        const baseQuery = this.createBaseQuery();
        baseQuery.where['user_email'] = email.value.toString();
        const identityUser = await this.model.findOne(baseQuery);
        if (!!identityUser === true) {
            return IdentityUserMap.toDomain(identityUser);
        }
        return null;

    }

    public async findIdentityUserByUsername(username: string): Promise<IdentityUser> {
        const baseQuery = this.createBaseQuery();
        baseQuery.where['username'] = username;
        const rawIdentityUser = await this.model.findOne(baseQuery);
        if (!!rawIdentityUser === true) {
            return IdentityUserMap.toDomain(rawIdentityUser);
        }
        return null;
    }

    public async save(identityUser: IdentityUser): Promise<void> {
        const exists = await this.exists(identityUser.email);
        const rawIdentityUser = await IdentityUserMap.toPersistence(identityUser);

        try {
            if (!exists) {
                await this.model.create(rawIdentityUser);
            } else {
                const sequelizeIdentityUserInstance = await this.model.findOne({
                    where: {user_email: identityUser.email.value}
                })
                await sequelizeIdentityUserInstance.update(rawIdentityUser);
            }
        } catch (err) {
            console.log(err);
        }
    }
}