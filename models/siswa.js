'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class siswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      /*
        relasi: siswa -> pelanggaran_siswa (parent ke child)
        key: id_siswa
        parent: siswa, child: pelanggaran_siswa (siswa menjadi parent karena id_siswa menjadi primary key (PK) di tabel siswa,
        dan pelanggaran_siswa menjadi child karena id_siswa menjadi foreign key (FK) di tabel pelanggaran_siswa)
        tipe: 1 siswa melakukan banyak pelanggaran (one to many)
      */
     this.hasMany(models.pelanggaran_siswa, {
       foreignKey: "id_siswa",
       as: "pelanggaran_siswa"
     })
    }
  }
  siswa.init({
    id_siswa:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nis: DataTypes.STRING,
    nama: DataTypes.STRING,
    kelas: DataTypes.STRING,
    poin: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'siswa',
    tableName: 'siswa'
  });
  return siswa;
};