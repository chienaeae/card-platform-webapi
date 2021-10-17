import * as sequelize from "sequelize-typescript";

export function mockSequelize(): sequelize.Sequelize{
    return new sequelize.Sequelize({
        database: '<any name>',
        dialect: 'sqlite',
        username: 'root',
        password: '',
        validateOnly: true
    })
}