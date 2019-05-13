'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('C_EMP_XM', [
      {"row_id":1, "name":"Bachelor's Degree", "type":"induction_checklist", "emp_id":1, "created":"2019-05-10 07:06:53", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":"", "ATTRIB_05":"", "ATTRIB_06":"", "ATTRIB_07":"", "ATTRIB_08":"", "ATTRIB_09":"", "ATTRIB_10":"", "ATTRIB_11":0, "ATTRIB_12":0, "ATTRIB_13":0, "ATTRIB_14":0, "ATTRIB_15":0, "ATTRIB_16":0, "ATTRIB_17":0, "ATTRIB_18":null, "ATTRIB_19":null, "ATTRIB_20":null, "ATTRIB_21":"", "ATTRIB_22":"", "ATTRIB_23":"", "ATTRIB_24":"", "ATTRIB_25":"", "FLG_01":0, "FLG_02":0, "FLG_03":0, "FLG_04":0, "FLG_05":0, "FLG_06":"", "FLG_07":"", "FLG_08":"", "FLG_09":"", "FLG_10":""},
      {"row_id":2, "name":"Domicile Document", "type":"induction_checklist", "emp_id":1, "created":"2019-05-10 07:06:53", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":"", "ATTRIB_05":"", "ATTRIB_06":"", "ATTRIB_07":"", "ATTRIB_08":"", "ATTRIB_09":"", "ATTRIB_10":"", "ATTRIB_11":0, "ATTRIB_12":0, "ATTRIB_13":0, "ATTRIB_14":0, "ATTRIB_15":0, "ATTRIB_16":0, "ATTRIB_17":0, "ATTRIB_18":null, "ATTRIB_19":null, "ATTRIB_20":null, "ATTRIB_21":"", "ATTRIB_22":"", "ATTRIB_23":"", "ATTRIB_24":"", "ATTRIB_25":"", "FLG_01":0, "FLG_02":0, "FLG_03":0, "FLG_04":0, "FLG_05":0, "FLG_06":"", "FLG_07":"", "FLG_08":"", "FLG_09":"", "FLG_10":""},
      {"row_id":3, "name":"Driver License", "type":"induction_checklist", "emp_id":1, "created":"2019-05-10 07:06:53", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":"", "ATTRIB_05":"", "ATTRIB_06":"", "ATTRIB_07":"", "ATTRIB_08":"", "ATTRIB_09":"", "ATTRIB_10":"", "ATTRIB_11":0, "ATTRIB_12":0, "ATTRIB_13":0, "ATTRIB_14":0, "ATTRIB_15":0, "ATTRIB_16":0, "ATTRIB_17":0, "ATTRIB_18":null, "ATTRIB_19":null, "ATTRIB_20":null, "ATTRIB_21":"", "ATTRIB_22":"", "ATTRIB_23":"", "ATTRIB_24":"", "ATTRIB_25":"", "FLG_01":0, "FLG_02":0, "FLG_03":0, "FLG_04":0, "FLG_05":0, "FLG_06":"", "FLG_07":"", "FLG_08":"", "FLG_09":"", "FLG_10":""},
      {"row_id":4, "name":"Photos", "type":"induction_checklist", "emp_id":1, "created":"2019-05-10 07:06:53", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":"", "ATTRIB_05":"", "ATTRIB_06":"", "ATTRIB_07":"", "ATTRIB_08":"", "ATTRIB_09":"", "ATTRIB_10":"", "ATTRIB_11":0, "ATTRIB_12":0, "ATTRIB_13":0, "ATTRIB_14":0, "ATTRIB_15":0, "ATTRIB_16":0, "ATTRIB_17":0, "ATTRIB_18":null, "ATTRIB_19":null, "ATTRIB_20":null, "ATTRIB_21":"", "ATTRIB_22":"", "ATTRIB_23":"", "ATTRIB_24":"", "ATTRIB_25":"", "FLG_01":0, "FLG_02":0, "FLG_03":0, "FLG_04":0, "FLG_05":0, "FLG_06":"", "FLG_07":"", "FLG_08":"", "FLG_09":"", "FLG_10":""}
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('C_EMP_XM', null, {});
  }
};
