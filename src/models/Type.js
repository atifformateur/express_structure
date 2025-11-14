'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Type extends Model {
        static associate(models)  {
            //un type possede plusieurs book
            Type.hasMany(models.Book, {
                as: 'books',
                foreignKey: 'type_id'
            });
        }
    }
    Type.init (
        {
            id : {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING(150),
                allowNull:false,
                validate: {
                    notEmpty: true,
                    len: [1, 150]
                }
            }
        }, {
            sequelize,
            modelName: 'Type',
            tableName: 'type',
            underscored: true,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    )
    return Type;
}


//class
//ini
