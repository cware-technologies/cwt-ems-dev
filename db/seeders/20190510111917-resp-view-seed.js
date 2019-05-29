'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('C_RESP_VIEW', [
      {"row_id":1, "bu_id":1, "view_id":1, "resp_id":1, "created":"2019-03-31 22:55:19", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":1, "FLG_02":0, "FLG_03":""},
      {"row_id":2, "bu_id":1, "view_id":2, "resp_id":1, "created":"2019-03-31 22:55:19", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":1, "FLG_02":0, "FLG_03":""},
      {"row_id":3, "bu_id":1, "view_id":3, "resp_id":1, "created":"2019-03-31 22:55:19", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":1, "FLG_02":1, "FLG_03":""},
      {"row_id":6, "bu_id":1, "view_id":4, "resp_id":1, "created":"2019-04-19 11:25:58", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":1, "FLG_02":0, "FLG_03":""},
      {"row_id":7, "bu_id":1, "view_id":5, "resp_id":1, "created":"2019-04-19 11:33:49", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":1, "FLG_02":1, "FLG_03":""},
      {"row_id":8, "bu_id":1, "view_id":18, "resp_id":1, "created":"2019-05-06 13:02:54", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":1, "FLG_02":0, "FLG_03":""},
      {"row_id":9, "bu_id":1, "view_id":19, "resp_id":1, "created":"2019-05-07 08:23:21", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":1, "FLG_02":0, "FLG_03":""},
      {"row_id":10, "bu_id":2, "view_id":1, "resp_id":2, "created":"2019-03-31 22:55:19", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":1, "FLG_02":0, "FLG_03":""},
      {"row_id":11, "bu_id":2, "view_id":2, "resp_id":2, "created":"2019-03-31 22:55:19", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":1, "FLG_02":0, "FLG_03":""},
      {"row_id":12, "bu_id":2, "view_id":3, "resp_id":2, "created":"2019-03-31 22:55:19", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":1, "FLG_02":1, "FLG_03":""},
      {"row_id":13, "bu_id":2, "view_id":4, "resp_id":2, "created":"2019-04-19 11:25:58", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":1, "FLG_02":0, "FLG_03":""},
      {"row_id":14, "bu_id":2, "view_id":5, "resp_id":2, "created":"2019-04-19 11:33:49", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":1, "FLG_02":1, "FLG_03":""},
      {"row_id":15, "bu_id":2, "view_id":18, "resp_id":2, "created":"2019-05-06 13:02:54", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":1, "FLG_02":0, "FLG_03":""},
      {"row_id":16, "bu_id":2, "view_id":19, "resp_id":2, "created":"2019-05-07 08:23:21", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":1, "FLG_02":0, "FLG_03":""},
      {"row_id":17, "bu_id":2, "view_id":19, "resp_id":3, "created":"2019-05-07 08:24:07", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":1, "FLG_02":0, "FLG_03":""}
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('C_RESP_VIEW', null, {});
  }
};
