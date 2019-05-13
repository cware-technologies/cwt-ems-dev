'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('C_EMP', [
      {"row_id":1, "emp_num":"CWT001", "fst_name":"Sajeel", "last_name":"Waien", "bu_id":2, "div_id":3, "postn_held_id":1, "resp_id":1, "pr_postn_id":0, "report_to_id":0, "created":"2019-04-17 04:59:42", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":"", "ATTRIB_05":"", "ATTRIB_06":"", "ATTRIB_07":"", "ATTRIB_08":"", "ATTRIB_09":"", "ATTRIB_10":"", "ATTRIB_11":0, "ATTRIB_12":0, "ATTRIB_13":0, "ATTRIB_14":0, "ATTRIB_15":0, "ATTRIB_16":0, "ATTRIB_17":0, "ATTRIB_18":null, "ATTRIB_19":null, "ATTRIB_20":null, "FLG_01":"", "FLG_02":"", "FLG_03":"", "FLG_04":"", "FLG_05":"", "FLG_06":"", "FLG_07":"", "FLG_08":"", "FLG_09":"", "FLG_10":""},
      {"row_id":2, "emp_num":"CWT002", "fst_name":"Ehsan", "last_name":"Hassan", "bu_id":2, "div_id":3, "postn_held_id":1, "resp_id":1, "pr_postn_id":0, "report_to_id":1, "created":"2019-04-17 12:16:22", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":"", "ATTRIB_05":"", "ATTRIB_06":"", "ATTRIB_07":"", "ATTRIB_08":"", "ATTRIB_09":"", "ATTRIB_10":"", "ATTRIB_11":0, "ATTRIB_12":0, "ATTRIB_13":0, "ATTRIB_14":0, "ATTRIB_15":0, "ATTRIB_16":0, "ATTRIB_17":0, "ATTRIB_18":null, "ATTRIB_19":null, "ATTRIB_20":null, "FLG_01":"", "FLG_02":"", "FLG_03":"", "FLG_04":"", "FLG_05":"", "FLG_06":"", "FLG_07":"", "FLG_08":"", "FLG_09":"", "FLG_10":""}
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('C_EMP', null, {});
  }
};
