'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pelanggaran_siswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      /* 
        relasi : pelanggaran_siswa -> siswa
        key: id_siswa
        parent: siswa, child: pelanggaran_siswa (FK/Foreign Key: id_siswa)
        tipe: 1 pelanggaran_siswa dilakukan oleh 1 siwa (one to one)
        */
        this.belongsTo(models.siswa, {
          foreignKey: "id_siswa",
          as: "siswa"
        })

        /* 
        relasi : pelanggaran_siswa -> user
        key: id_user
        parent: user, child: pelanggaran_siswa (FK/Foreign Key: id_user)
        tipe: 1 pelanggaran_siswa dicatat oleh 1 siwa (one to one)
      */
        this.belongsTo(models.user, {
          foreignKey: "id_user",
          as: "user"
        })

        /* 
        relasi : pelanggaran_siswa -> detail_pelanggaran_siswa
        key: id_pelanggaran_siswa
        parent: pelanggaran_siswa, child: detail_pelanggaran_siswa (FK/Foreign Key: id_pelanggaran)
        tipe: 1 pelanggaran_siswa mempunyai banyak detail pelanggaran (one to one)
        */
       this.hasMany(models.detail_pelanggaran_siswa, {
         foreignKey: "id_pelanggaran_siswa",
         as: "detail_pelanggaran_siswa"
       })
    }
  }
  pelanggaran_siswa.init({
    id_pelanggaran_siswa:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    waktu: DataTypes.DATE,
    id_siswa: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pelanggaran_siswa',
  });
  return pelanggaran_siswa;
};