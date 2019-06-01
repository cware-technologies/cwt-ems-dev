'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('C_RESP', [
      {"row_id":1, "name":"cadmin", "desc":"This responsibility is for the admin of organization", "bu_id":1, "created":"2019-05-06 12:06:12", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":"", "FLG_02":"", "FLG_03":""},
      // {"row_id":2, "name":"Employee", "desc":"This is basic responsibility attached with every employee", "bu_id":2, "created":"2019-03-31 22:55:19", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":"", "FLG_02":"", "FLG_03":""},
      // {"row_id":3, "name":"Admin", "desc":"This responsibility is for the admin of organization", "bu_id":2, "created":"2019-05-06 12:06:12", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":"", "FLG_02":"", "FLG_03":""},
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('C_RESP', null, {});
  }
};
