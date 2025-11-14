'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('book', 'type_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'type',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('book', 'type_id')
  }
};
