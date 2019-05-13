'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('C_DIV', [
      {"row_id":1, "name":"Country Sales", "bu_id":1, "desc":"", "par_row_id":1, "created":"2019-03-31 22:55:19", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":"2019-03-31 22:55:19", "FLG_01":"", "FLG_02":"", "FLG_03":""},
      {"row_id":2, "name":"Human Resources", "bu_id":2, "desc":"", "par_row_id":3, "created":"2019-03-31 22:55:19", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":"2019-03-31 22:55:19", "FLG_01":"", "FLG_02":"", "FLG_03":""},
      {"row_id":3, "name":"Technical Sales", "bu_id":2, "desc":"", "par_row_id":2, "created":"2019-04-14 12:37:02", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":"2019-03-31 22:55:19", "FLG_01":"", "FLG_02":"", "FLG_03":""},
      {"row_id":4, "name":"Operations", "bu_id":1, "desc":"", "par_row_id":0, "created":"2019-04-14 12:46:21", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":"2019-03-31 22:55:19", "FLG_01":"", "FLG_02":"", "FLG_03":""},
      {"row_id":5, "name":"Data Analysis", "bu_id":1, "desc":"", "par_row_id":4, "created":"2019-04-14 13:59:40", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":"2019-03-31 22:55:19", "FLG_01":"", "FLG_02":"", "FLG_03":""},
      {"row_id":6, "name":"Database", "bu_id":1, "desc":"", "par_row_id":5, "created":"2019-04-14 14:08:03", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":"2019-03-31 22:55:19", "FLG_01":"", "FLG_02":"", "FLG_03":""}
  ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('C_DIV', null, {});
  }
};
