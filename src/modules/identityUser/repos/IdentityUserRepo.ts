import {IdentityEmail} from "../domain/IdentityEmail";
import {IdentityUser} from "../domain/IdentityUser";
import {IdentityUserMap} from "../mappers/IdentityUserMap";
import {IIdentityUserRepo} from "./interfaces/IIdentityUserRepo";
import {injectable} from "inversify";

@injectable()
export class IdentityUserRepo implements IIdentityUserRepo {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    private createBaseQuery() {
        const {models} = this;
        return {
            where: {}
        }
    }

    public async exists(email: IdentityEmail): Promise<boolean> {
        const baseQuery = this.createBaseQuery();
        baseQuery.where['user_email'] = email.value.toString();
        const identityUser = await this.models.IdentityUser.findOne(baseQuery);
        return !!identityUser == true;
    }

    public async findIdentityUserByEmail(email: IdentityEmail): Promise<IdentityUser> {
        const baseQuery = this.createBaseQuery();
        baseQuery.where['user_email'] = email.value.toString();
        const identityUser = await this.models.IdentityUser.findOne(baseQuery);
        if (!!identityUser === true) {
            return IdentityUserMap.toDomain(identityUser);
        }
        return null;

    }

    public async findIdentityUserByUsername(username: string): Promise<IdentityUser> {
        const baseQuery = this.createBaseQuery();
        baseQuery.where['username'] = username;
        const identityUser = await this.models.IdentityUser.findOne(baseQuery);
        if (!!identityUser === true) {
            return IdentityUserMap.toDomain(identityUser);
        }
        return null;
    }

    public async save(identityUser: IdentityUser): Promise<void> {
        const IdentityUserUserModel = this.models.IdentityUser;
        const exists = await this.exists(identityUser.email);
        const rawIdentityUser = await IdentityUserMap.toPersistence(identityUser);

        try {
            if (!exists) {
                await IdentityUserUserModel.create(rawIdentityUser);
            } else {
                const sequelizeIdentityUserInstance = await IdentityUserUserModel.findOne({
                    where: {user_email: identityUser.email.value}
                })
                await sequelizeIdentityUserInstance.update(rawIdentityUser);
            }
        } catch (err) {
            console.log(err);
        }
    }
}