"use.strict";

const  {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Book extends Model {
        static associate(models){

        }
    }

    Book.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING(150),
                allowNull: false,
                validate: {
                    notEmpty: true,
                    len: [1, 150]
                }
            },
            author: {
                type: DataTypes.STRING(150),
                allowNull: false,
                validate: {
                    notEmpty: true,
                    len: [1, 150]
                }
            },
            dispo: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        },{
            sequelize,
                sequelize,
                modelName: "Book", //le nom du model en javascript
                tableName: "book", //le nom de la table en db
                underscored: true, // snake case => kamelcase
                timestamps: true, // gestion du created at et updated automatiquement
                createdAt: "created_at",
                updatedAt: "updated_at",
        }
    );
    return Book;
}