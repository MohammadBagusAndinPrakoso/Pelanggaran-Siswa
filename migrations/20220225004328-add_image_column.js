'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    // menambahkan kolom baru dengan anama "image" bertipe "string" di tabel "siswa"
    await queryInterface.addColumn("siswa", "image", {type : Sequelize.STRING})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    // menghapus koolom "image" pada tabel "siswa"
     await queryInterface.removeColumn("siswa", "image")
  }
};
