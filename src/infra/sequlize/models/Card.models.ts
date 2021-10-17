import {Table, Column, Model, DataType, HasMany} from 'sequelize-typescript';
import {CardOrder} from "./CardOrder.model";
import {CardTrade} from "./CardTrade.model";

interface CardAttributes {
    card_id: string;
    card_index: number;
    card_name: string;
    created_time?: Date;
    updated_time?: Date;
}

@Table({
    timestamps: true,
    tableName: 'card',
    underscored: true,
    createdAt: 'created_time',
    updatedAt: 'updated_time'
})
export class Card extends Model<CardAttributes> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        primaryKey: true
    })
    public card_id!: string;

    @Column({
        type: DataType.INTEGER,
        unique: true,
        allowNull: false,
    })
    public card_index!: number;

    @Column({
        type: DataType.STRING(250),
        unique: true,
        allowNull: false
    })
    public card_name!: string;

    public readonly created_time!: Date;
    public readonly updated_time!: Date;

    @HasMany(() => CardOrder,
        {foreignKey: 'order_card_index', sourceKey: 'card_index', as: 'CardOrder'})
    public cardOrders: CardOrder[]


    @HasMany(() => CardTrade,
        {foreignKey: 'trade_card_id', sourceKey: 'card_id', as: 'CardTrade'})
    public cardTrades: CardTrade[]
}