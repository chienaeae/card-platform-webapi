import { Optional } from 'sequelize'
import {Table, Column, Model, DataType, HasOne, BelongsTo, CreatedAt, UpdatedAt, HasMany} from 'sequelize-typescript';
import {IdentityUser} from "./IdentityUser.model";
import {CardOrder} from "./CardOrder.model";

interface TraderAttributes {
    trader_id: string;
    identity_user_id: string;
    created_time?: Date;
}

@Table({
    timestamps: true,
    tableName: 'trader',
    underscored: true,
    createdAt: 'created_time',
    updatedAt: 'updated_time'
})
export class Trader extends Model<TraderAttributes> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        primaryKey: true
    })
    public trader_id!: string;
    @Column({
        type: DataType.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'identity_user',
            key: 'user_id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    })
    public identity_user_id!: string;

    public created_time!: Date;
    public updated_time!: Date;

    @BelongsTo(() => IdentityUser,
        { foreignKey: 'identity_user_id', targetKey: 'user_id', as: 'IdentityUser' })
    public identity_user: IdentityUser

    @HasMany(() => CardOrder,
        {foreignKey: 'order_trader_id', sourceKey: 'trader_id', as: 'CardOrder'})
    public cardOrders: CardOrder[]
}
