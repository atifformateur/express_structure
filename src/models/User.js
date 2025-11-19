'use_strict'

const { Model } = require('sequelize');

module.exports =(sequelize, DataTypes)=>{
    class User extends Model{};

    User.init({
        email: {
            type: DataTypes.STRING(155),
            allowNull:false,
            unique:true,
            validate: {
                isEmail: true
            }
        },
        password_hash: {
            type: DataTypes.STRING(300),
            allowNull:false
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            defaultValue: 'user'
        }
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'user',
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return User;
}
