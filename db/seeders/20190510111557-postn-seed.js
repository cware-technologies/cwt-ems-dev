'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('C_POSTN', [
      {"row_id":1, "name":"Sales", "bu_id":2, "div_id":3, "desc":"", "par_row_id":0, "created":"2019-04-16 07:10:54", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":"", "FLG_02":"", "FLG_03":""},
      {"row_id":2, "name":"Fails", "bu_id":2, "div_id":3, "desc":"", "par_row_id":1, "created":"2019-04-16 07:11:17", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":"", "FLG_02":"", "FLG_03":""}
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('C_POSTN', null, {});
  }
};
