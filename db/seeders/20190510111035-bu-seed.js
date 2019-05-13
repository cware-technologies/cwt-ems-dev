'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('C_BU', [
      {"row_id":1, "name":"Default Organization", "desc":"", "par_row_id":1, "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":"2019-03-31 22:55:19", "FLG_01":"", "FLG_02":"", "FLG_03":"", "created":"2019-03-31 22:55:19"},
      {"row_id":2, "name":"CWare Technologies", "desc":"", "par_row_id":1, "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":"2019-03-31 22:55:19", "FLG_01":"", "FLG_02":"", "FLG_03":"", "created":"2019-03-31 22:55:19"},
      {"row_id":3, "name":"Amazon", "desc":"", "par_row_id":2, "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":"2019-03-31 22:55:19", "FLG_01":"", "FLG_02":"", "FLG_03":"", "created":"2019-04-12 12:07:57"},
      {"row_id":4, "name":"Facebook", "desc":"", "par_row_id":3, "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":"2019-03-31 22:55:19", "FLG_01":"", "FLG_02":"", "FLG_03":"", "created":"2019-04-12 12:09:22"},
      {"row_id":5, "name":"Microsoft", "desc":"", "par_row_id":0, "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":"", "FLG_02":"", "FLG_03":"", "created":"2019-04-17 05:08:52"},
      {"row_id":7, "name":"Github", "desc":"", "par_row_id":5, "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":"", "FLG_02":"", "FLG_03":"", "created":"2019-04-17 05:09:27"},
      {"row_id":8, "name":"aws", "desc":"", "par_row_id":3, "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":"", "FLG_02":"", "FLG_03":"", "created":"2019-05-06 07:40:30"}
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('C_BU', null, {});
  }
};
