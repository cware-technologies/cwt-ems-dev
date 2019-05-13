'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('C_VIEW', [
      {"row_id":1, "name":"Homepage", "desc":"sdasaca as as a qw qwdasd qw asd awe qwd asd", "bu_id":1, "created":"2019-03-31 22:55:19", "ATTRIB_01":"dashboard", "ATTRIB_02":"navbar", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":"", "FLG_02":"", "FLG_03":""},
      {"row_id":2, "name":"Leavelist", "desc":"q qw asd asdqw qda sdw ", "bu_id":1, "created":"2019-03-31 22:55:19", "ATTRIB_01":"leaves", "ATTRIB_02":"navbar", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":"", "FLG_02":"", "FLG_03":""},
      {"row_id":3, "name":"Register User", "desc":"sd asd qwqd qsd asqwe qs", "bu_id":1, "created":"2019-03-31 22:55:19", "ATTRIB_01":"register-user", "ATTRIB_02":"navbar", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":"", "FLG_02":"", "FLG_03":""},
      {"row_id":4, "name":"Attendance", "desc":"d asdwd sdwef", "bu_id":1, "created":"2019-03-31 22:55:19", "ATTRIB_01":"attendance", "ATTRIB_02":"user-menu", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":"", "FLG_02":"", "FLG_03":""},
      {"row_id":5, "name":"Access Rights", "desc":"ef wef w wef we", "bu_id":1, "created":"2019-03-31 22:55:19", "ATTRIB_01":"access-rights", "ATTRIB_02":"navbar", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":"", "FLG_02":"", "FLG_03":""},
      {"row_id":18, "name":"Induction Checklist", "desc":"smdoiasjdoiajsoidjaoisdj", "bu_id":1, "created":"2019-05-06 11:59:18", "ATTRIB_01":"induction-list-admin", "ATTRIB_02":"navbar", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":"", "FLG_02":"", "FLG_03":""},
      {"row_id":19, "name":"Organization Structure", "desc":"Admin can define organization structure like new organization, divisions, positions.", "bu_id":1, "created":"2019-05-07 08:23:01", "ATTRIB_01":"organization-structure", "ATTRIB_02":"navbar", "ATTRIB_03":"", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":"", "FLG_02":"", "FLG_03":""}
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('C_VIEW', null, {});
  }
};
