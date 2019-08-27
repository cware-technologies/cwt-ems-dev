'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('C_VIEW', [
      {"row_id":1, "name":"Homepage", "desc":"sdasaca as as a qw qwdasd qw asd awe qwd asd", "bu_id":1, "created":"2019-03-31 22:55:19", "ATTRIB_01":"dashboard", "ATTRIB_02":"navbar", "ATTRIB_03":"root", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":"", "FLG_02":"", "FLG_03":""},
      {"row_id":2, "name":"Leave Manager", "desc":"q qw asd asdqw qda sdw ", "bu_id":1, "created":"2019-03-31 22:55:19", "ATTRIB_01":"leave-manager", "ATTRIB_02":"navbar", "ATTRIB_03":"leave-manager", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":"", "FLG_02":"", "FLG_03":""},
      {"row_id":3, "name":"Employee Manager", "desc":"A portal to manage (search, add, update, delete) emloyees.", "bu_id":1, "created":"2019-03-31 22:55:19", "ATTRIB_01":"employee-manager", "ATTRIB_02":"navbar", "ATTRIB_03":"admin-panel", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":"", "FLG_02":"", "FLG_03":""},
      {"row_id":4, "name":"Attendance", "desc":"d asdwd sdwef", "bu_id":1, "created":"2019-03-31 22:55:19", "ATTRIB_01":"attendance", "ATTRIB_02":"usermenu", "ATTRIB_03":"admin-panel", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":"", "FLG_02":"", "FLG_03":""},
      {"row_id":5, "name":"Access Rights", "desc":"ef wef w wef we", "bu_id":1, "created":"2019-03-31 22:55:19", "ATTRIB_01":"access-rights", "ATTRIB_02":"navbar", "ATTRIB_03":"admin-panel", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":"", "FLG_02":"", "FLG_03":""},
      {"row_id":6, "name":"Induction/Exit Manager", "desc":"smdoiasjdoiajsoidjaoisdj", "bu_id":1, "created":"2019-05-06 11:59:18", "ATTRIB_01":"induction-exit-manager", "ATTRIB_02":"navbar", "ATTRIB_03":"admin-panel", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":"", "FLG_02":"", "FLG_03":""},
      {"row_id":7, "name":"Organization Structure", "desc":"Admin can define organization structure like new organization, divisions, positions.", "bu_id":1, "created":"2019-05-07 08:23:01", "ATTRIB_01":"organization-structure", "ATTRIB_02":"navbar", "ATTRIB_03":"admin-panel", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":"", "FLG_02":"", "FLG_03":""},
      {"row_id":8, "name":"Post Update", "desc":"ef wef w wef we", "bu_id":1, "created":"2019-03-31 22:55:19", "ATTRIB_01":"post-update", "ATTRIB_02":"navbar", "ATTRIB_03":"admin-panel", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":"", "FLG_02":"", "FLG_03":""},
      {"row_id":9, "name":"HR Documents", "desc":"smdoiasjdoiajsoidjaoisdj", "bu_id":1, "created":"2019-05-06 11:59:18", "ATTRIB_01":"hr-documents", "ATTRIB_02":"navbar", "ATTRIB_03":"my-services", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":"", "FLG_02":"", "FLG_03":""},
      {"row_id":10, "name":"Entitlements Manager", "desc":"ef wef w wef we", "bu_id":1, "created":"2019-03-31 22:55:19", "ATTRIB_01":"entitlements-manager", "ATTRIB_02":"navbar", "ATTRIB_03":"admin-panel", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":"", "FLG_02":"", "FLG_03":""},
      {"row_id":11, "name":"Employee Details (Admin)", "desc":"smdoiasjdoiajsoidjaoisdj", "bu_id":1, "created":"2019-05-06 11:59:18", "ATTRIB_01":"employee-details", "ATTRIB_02":"navbar", "ATTRIB_03":"admin-panel", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":"", "FLG_02":"", "FLG_03":""},
      {"row_id":12, "name":"Assets Manager", "desc":"smdoiasjdoiajsoidjaoisdj", "bu_id":1, "created":"2019-05-06 11:59:18", "ATTRIB_01":"asset-manager", "ATTRIB_02":"navbar", "ATTRIB_03":"admin-panel", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":"", "FLG_02":"", "FLG_03":""},
      {"row_id":13, "name":"Eligibility Manager", "desc":"smdoiasjdoiajsoidjaoisdj", "bu_id":1, "created":"2019-05-06 11:59:18", "ATTRIB_01":"eligibility-manager", "ATTRIB_02":"navbar", "ATTRIB_03":"admin-panel", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":"", "FLG_02":"", "FLG_03":""},
      {"row_id":14, "name":"My Contracts", "desc":"smdoiasjdoiajsoidjaoisdj", "bu_id":1, "created":"2019-05-06 11:59:18", "ATTRIB_01":"my-contracts", "ATTRIB_02":"navbar", "ATTRIB_03":"my-services", "ATTRIB_04":0, "ATTRIB_05":0, "ATTRIB_06":0, "ATTRIB_07":null, "FLG_01":"", "FLG_02":"", "FLG_03":""},
      {
        "row_id" : 15,
        "name" : "Ticket Types",
        "desc" : null,
        "bu_id" : 1,
        "created" : "2019-08-26 14:59:18",
        "ATTRIB_01" : "it-ticket-type",
        "ATTRIB_02" : "navbar",
        "ATTRIB_03" : "admin-panel",
        "ATTRIB_04" : null,
        "ATTRIB_05" : null,
        "ATTRIB_06" : null,
        "ATTRIB_07" : null,
        "FLG_01" : null,
        "FLG_02" : null,
        "FLG_03" : null
      },
      {
        "row_id" : 16,
        "name" : "Expense Types",
        "desc" : null,
        "bu_id" : 1,
        "created" : "2019-08-26 14:59:18",
        "ATTRIB_01" : "expense-nature",
        "ATTRIB_02" : "navbar",
        "ATTRIB_03" : "admin-panel",
        "ATTRIB_04" : null,
        "ATTRIB_05" : null,
        "ATTRIB_06" : null,
        "ATTRIB_07" : null,
        "FLG_01" : null,
        "FLG_02" : null,
        "FLG_03" : null
      },
      {
        "row_id" : 17,
        "name" : "My HR Documents",
        "desc" : null,
        "bu_id" : 1,
        "created" : "2019-08-26 14:59:18",
        "ATTRIB_01" : "hr-docs",
        "ATTRIB_02" : "navbar",
        "ATTRIB_03" : "my-services",
        "ATTRIB_04" : null,
        "ATTRIB_05" : null,
        "ATTRIB_06" : null,
        "ATTRIB_07" : null,
        "FLG_01" : null,
        "FLG_02" : null,
        "FLG_03" : null
      },
      {
        "row_id" : 18,
        "name" : "Expense Claim",
        "desc" : null,
        "bu_id" : 1,
        "created" : "2019-08-26 14:59:18",
        "ATTRIB_01" : "expense-claim",
        "ATTRIB_02" : "navbar",
        "ATTRIB_03" : "my-services",
        "ATTRIB_04" : null,
        "ATTRIB_05" : null,
        "ATTRIB_06" : null,
        "ATTRIB_07" : null,
        "FLG_01" : null,
        "FLG_02" : null,
        "FLG_03" : null
      },
      {
        "row_id" : 19,
        "name" : "It Ticket",
        "desc" : null,
        "bu_id" : 1,
        "created" : "2019-08-26 14:59:18",
        "ATTRIB_01" : "it-tickets",
        "ATTRIB_02" : "navbar",
        "ATTRIB_03" : "my-services",
        "ATTRIB_04" : null,
        "ATTRIB_05" : null,
        "ATTRIB_06" : null,
        "ATTRIB_07" : null,
        "FLG_01" : null,
        "FLG_02" : null,
        "FLG_03" : null
      },
      {
        "row_id" : 20,
        "name" : "HR Document Types",
        "desc" : null,
        "bu_id" : 1,
        "created" : "2019-08-26 14:59:18",
        "ATTRIB_01" : "hr-docs-type",
        "ATTRIB_02" : "navbar",
        "ATTRIB_03" : "admin-panel",
        "ATTRIB_04" : null,
        "ATTRIB_05" : null,
        "ATTRIB_06" : null,
        "ATTRIB_07" : null,
        "FLG_01" : null,
        "FLG_02" : null,
        "FLG_03" : null
      },
      {
        "row_id" : 21,
        "name" : "Profile",
        "desc" : "askkndasdjaisjdoias",
        "bu_id" : 1,
        "created" : "2019-05-06 11:59:18",
        "ATTRIB_01" : "my-profile",
        "ATTRIB_02" : "navbar",
        "ATTRIB_03" : "my-profile",
        "ATTRIB_04" : null,
        "ATTRIB_05" : null,
        "ATTRIB_06" : null,
        "ATTRIB_07" : null,
        "FLG_01" : null,
        "FLG_02" : null,
        "FLG_03" : null
      },
      {
        "row_id" : 22,
        "name" : "Details",
        "desc" : "oaskdpoaskdposak",
        "bu_id" : 1,
        "created" : "2019-05-06 11:59:18",
        "ATTRIB_01" : "my-details",
        "ATTRIB_02" : "navbar",
        "ATTRIB_03" : "my-profile",
        "ATTRIB_04" : null,
        "ATTRIB_05" : null,
        "ATTRIB_06" : null,
        "ATTRIB_07" : null,
        "FLG_01" : null,
        "FLG_02" : null,
        "FLG_03" : null
      },
      {
        "row_id" : 23,
        "name" : "Skills",
        "desc" : "aksdmasmdoaisdjoasi",
        "bu_id" : 1,
        "created" : "2019-05-06 11:59:18",
        "ATTRIB_01" : "my-skills",
        "ATTRIB_02" : "navbar",
        "ATTRIB_03" : "my-profile",
        "ATTRIB_04" : null,
        "ATTRIB_05" : null,
        "ATTRIB_06" : null,
        "ATTRIB_07" : null,
        "FLG_01" : null,
        "FLG_02" : null,
        "FLG_03" : null
      },
      {
        "row_id" : 24,
        "name" : "Professional Attributes",
        "desc" : "skkoasijfoasijdoasijdoi",
        "bu_id" : 1,
        "created" : "2019-05-06 11:59:18",
        "ATTRIB_01" : "my-profile",
        "ATTRIB_02" : "navbar",
        "ATTRIB_03" : "my-profile",
        "ATTRIB_04" : null,
        "ATTRIB_05" : null,
        "ATTRIB_06" : null,
        "ATTRIB_07" : null,
        "FLG_01" : null,
        "FLG_02" : null,
        "FLG_03" : null
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('C_VIEW', null, {});
  }
};
