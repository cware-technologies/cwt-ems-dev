'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('C_USER', [
      {"row_id":1, "login":"cadmin", "slt_pwd":"cb07b86a-bcb5-4bb7-a00b-e42e9d64e87d", "hash_pwd":"$2a$12$PLqFyg8obcrA2BiQ2IyKj.EUazkHXicfNeg09stNcJK67o7ui7dAy", "emp_id":1, "resp_id":1, "fst_name":"admin", "last_name":"admin", "bu_id":1, "div_id":1, "created":"2019-05-27 07:10:58", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":"", "ATTRIB_05":"", "ATTRIB_06":"", "ATTRIB_07":"", "ATTRIB_08":"", "ATTRIB_09":"", "ATTRIB_10":"", "ATTRIB_11":0, "ATTRIB_12":0, "ATTRIB_13":0, "ATTRIB_14":0, "ATTRIB_15":0, "ATTRIB_16":0, "ATTRIB_17":0, "ATTRIB_18":null, "ATTRIB_19":null, "ATTRIB_20":null, "FLG_01":"", "FLG_02":"", "FLG_03":"", "FLG_04":"", "FLG_05":"", "FLG_06":"", "FLG_07":"", "FLG_08":"", "FLG_09":"", "FLG_10":""},
      // {"row_id":2, "login":"sajeel@cwaret.com", "slt_pwd":"e54ec2da-fad8-41ed-b7ca-a209e5ef1da2", "hash_pwd":"$2a$12$7aaI2prQenQyK25oOqp5zu8p9zTpP1M8RRTxRdZoPs0HY7T.pvFGG", "emp_id":2, "resp_id":2, "fst_name":"Sajeel", "last_name":"Waien", "bu_id":2, "div_id":3, "created":"2019-04-17 04:59:42", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":"", "ATTRIB_05":"", "ATTRIB_06":"", "ATTRIB_07":"", "ATTRIB_08":"", "ATTRIB_09":"", "ATTRIB_10":"", "ATTRIB_11":0, "ATTRIB_12":0, "ATTRIB_13":0, "ATTRIB_14":0, "ATTRIB_15":0, "ATTRIB_16":0, "ATTRIB_17":0, "ATTRIB_18":null, "ATTRIB_19":null, "ATTRIB_20":null, "FLG_01":"", "FLG_02":"", "FLG_03":"", "FLG_04":"", "FLG_05":"", "FLG_06":"", "FLG_07":"", "FLG_08":"", "FLG_09":"", "FLG_10":""},
      // {"row_id":3, "login":"ehsan@cwaret.com", "slt_pwd":"914ce183-586a-481b-8782-2d271db3dd7e", "hash_pwd":"$2a$12$RHrVfyY.bVst26k/NytY5.HeRG85/6vdknnBzdi/TmZ7yyjmOds0K", "emp_id":3, "resp_id":2, "fst_name":"Ehsan", "last_name":"Hassan", "bu_id":2, "div_id":3, "created":"2019-04-17 12:16:22", "ATTRIB_01":"", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":"", "ATTRIB_05":"", "ATTRIB_06":"", "ATTRIB_07":"", "ATTRIB_08":"", "ATTRIB_09":"", "ATTRIB_10":"", "ATTRIB_11":0, "ATTRIB_12":0, "ATTRIB_13":0, "ATTRIB_14":0, "ATTRIB_15":0, "ATTRIB_16":0, "ATTRIB_17":0, "ATTRIB_18":null, "ATTRIB_19":null, "ATTRIB_20":null, "FLG_01":"", "FLG_02":"", "FLG_03":"", "FLG_04":"", "FLG_05":"", "FLG_06":"", "FLG_07":"", "FLG_08":"", "FLG_09":"", "FLG_10":""},
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('C_USER', null, {});
  }
};
