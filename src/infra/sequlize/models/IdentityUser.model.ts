import {Optional} from 'sequelize'
import {Table, Column, Model, DataType} from 'sequelize-typescript';

interface UserAttributes {
    user_id: string;
    username?: string;
    user_email: string;
    user_password?: string;
    created_time?: Date;
    updated_time?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "user_id" | "user_email"> {
}

@Table({
    timestamps: true,
    tableName: 'identity_user',
    underscored: true,
    indexes: [{
        unique: true,
        fields: ['user_email']
    }],
    createdAt: 'created_time',
    updatedAt: 'updated_time'
})
export class IdentityUser extends Model<UserAttributes, UserCreationAttributes>{
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        primaryKey: true
    })
    public user_id!: string;
    @Column({
        type: DataType.STRING(250),
        allowNull: true
    })
    public username!: string;
    @Column({
        type: DataType.STRING(250),
        allowNull: false,
        unique: true
    })
    public user_email!: string;
    @Column({
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null
    })
    public user_password!: string;

    public readonly created_time!: Date;
    public readonly updated_time!: Date;

}
