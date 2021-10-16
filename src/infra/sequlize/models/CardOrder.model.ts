import {Table, Column, Model, DataType, BelongsTo, HasMany} from 'sequelize-typescript';
import {Card} from "./Card.models";
import {IdentityUser} from "./IdentityUser.model";
import {Trader} from "./Trader.model";
import {CardTrade} from "./CardTrade.model";

interface CardOrderAttributes {
    order_id: string;
    order_price: number;
    order_trader_id: string;
    order_card_id: number;
    order_completed: number;
    order_type: string;
    ordered_time?: Date;
    created_time?: Date;
    updated_time?: Date;
}

@Table({
    timestamps: true,
    tableName: 'card_order',
    underscored: true,
    indexes: [
        {
            fields: ['ordered_time']
        }
    ],
    createdAt: 'created_time',
    updatedAt: 'updated_time'

})
export class CardOrder extends Model<CardOrderAttributes> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        primaryKey: true
    })
    public order_id!: string;

    @Column({
        type: DataType.DECIMAL,
        allowNull: false
    })
    public order_price!: number;

    @Column({
        type: DataType.UUID,
        allowNull: false,
        references: {
            model: 'trader',
            key: 'trader_id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
    })
    public order_trader_id!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        references: {
            model: 'card',
            key: 'card_id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    })
    public order_card_id!: number;

    @Column({
        type: DataType.TINYINT,
        allowNull: false
    })
    public order_completed!: number;

    @Column({
        type: DataType.ENUM,
        values: ['sell', 'buy'],
        allowNull: false
    })
    public order_type!: string;

    @Column({
        type: DataType.DATE(6),
        allowNull: false
    })
    public ordered_time!: Date;

    public readonly created_time!: Date;
    public readonly updated_time!: Date;


    @BelongsTo(() => Card,
        {foreignKey: 'order_card_id', targetKey: 'card_id', as: 'Card'})
    public card: Card

    @BelongsTo(() =>
            Trader,
        {foreignKey: 'order_trader_id', targetKey: 'trader_id', as: 'Trader'})
    public trader: Trader
}