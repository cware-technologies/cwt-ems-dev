'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('C_ORG_NEWS', [
      {"row_id":1, "bu_id":1, "stat_cd":"active", "type_cd":"Company News", "ATTRIB_01":"Here the content of the news will go with a maximum of 1000 character only.1111111", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":"", "ATTRIB_05":"", "ATTRIB_06":"", "ATTRIB_07":"", "ATTRIB_08":"", "ATTRIB_09":"", "ATTRIB_10":"News 111", "ATTRIB_11":0, "ATTRIB_12":0, "ATTRIB_13":0, "ATTRIB_14":0, "ATTRIB_15":0, "ATTRIB_16":0, "ATTRIB_17":0, "ATTRIB_18":"2019-03-31 23:12:39", "ATTRIB_19":"2019-03-31 23:12:39", "ATTRIB_20":"2019-03-31 23:12:39", "FLG_01":"", "FLG_02":"", "FLG_03":"", "FLG_04":"", "FLG_05":"", "FLG_06":"", "FLG_07":"", "FLG_08":"", "FLG_09":"", "FLG_10":"", "DIV_ID":0, "IMG_PTH":"https://i.imgur.com/JFEkQAz.jpg", "created":"2019-03-31 23:12:31"},
      {"row_id":2, "bu_id":1, "stat_cd":"active", "type_cd":"Company News", "ATTRIB_01":"Here the content of the news will go with a maximum of 1000 character only.2222222", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":"", "ATTRIB_05":"", "ATTRIB_06":"", "ATTRIB_07":"", "ATTRIB_08":"", "ATTRIB_09":"", "ATTRIB_10":"News 222", "ATTRIB_11":0, "ATTRIB_12":0, "ATTRIB_13":0, "ATTRIB_14":0, "ATTRIB_15":0, "ATTRIB_16":0, "ATTRIB_17":0, "ATTRIB_18":"2019-03-31 23:12:39", "ATTRIB_19":"2019-03-31 23:12:39", "ATTRIB_20":"2019-03-31 23:12:39", "FLG_01":"", "FLG_02":"", "FLG_03":"", "FLG_04":"", "FLG_05":"", "FLG_06":"", "FLG_07":"", "FLG_08":"", "FLG_09":"", "FLG_10":"", "DIV_ID":0, "IMG_PTH":"https://i.imgur.com/hdp9Eil.jpg", "created":"2019-03-31 23:12:39"},
      {"row_id":3, "bu_id":1, "stat_cd":"active", "type_cd":"Company News", "ATTRIB_01":"Here the content of the news will go with a maximum of 1000\r\ncharacter only.333333", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":"", "ATTRIB_05":"", "ATTRIB_06":"", "ATTRIB_07":"", "ATTRIB_08":"", "ATTRIB_09":"", "ATTRIB_10":"News 333", "ATTRIB_11":0, "ATTRIB_12":0, "ATTRIB_13":0, "ATTRIB_14":0, "ATTRIB_15":0, "ATTRIB_16":0, "ATTRIB_17":0, "ATTRIB_18":"2019-03-31 23:12:39", "ATTRIB_19":"2019-03-31 23:12:39", "ATTRIB_20":"2019-03-31 23:12:39", "FLG_01":"", "FLG_02":"", "FLG_03":"", "FLG_04":"", "FLG_05":"", "FLG_06":"", "FLG_07":"", "FLG_08":"", "FLG_09":"", "FLG_10":"", "DIV_ID":0, "IMG_PTH":"https://i.imgur.com/RyeXJ3Y.jpg", "created":"2019-03-31 23:12:47"},
      {"row_id":4, "bu_id":1, "stat_cd":"active", "type_cd":"Economy", "ATTRIB_01":"", "ATTRIB_02":"https://www.samaa.tv/sports/2019/03/live-updates-pak-vs-aus-1st-odi-uae-2019/", "ATTRIB_03":"", "ATTRIB_04":"", "ATTRIB_05":"", "ATTRIB_06":"", "ATTRIB_07":"", "ATTRIB_08":"", "ATTRIB_09":"", "ATTRIB_10":"Pak Lost First ODI", "ATTRIB_11":0, "ATTRIB_12":0, "ATTRIB_13":0, "ATTRIB_14":0, "ATTRIB_15":0, "ATTRIB_16":0, "ATTRIB_17":0, "ATTRIB_18":"2019-03-31 23:12:39", "ATTRIB_19":"2019-03-31 23:12:39", "ATTRIB_20":"2019-03-31 23:12:39", "FLG_01":"", "FLG_02":"", "FLG_03":"", "FLG_04":"", "FLG_05":"", "FLG_06":"", "FLG_07":"", "FLG_08":"", "FLG_09":"", "FLG_10":"", "DIV_ID":0, "IMG_PTH":"", "created":"2019-03-31 23:19:09"},
      {"row_id":5, "bu_id":1, "stat_cd":"active", "type_cd":"Economy", "ATTRIB_01":"", "ATTRIB_02":"https://www.samaa.tv/sports/2019/03/live-updates-pakistan-vs-australia-2019-2nd-odi/", "ATTRIB_03":"", "ATTRIB_04":"", "ATTRIB_05":"", "ATTRIB_06":"", "ATTRIB_07":"", "ATTRIB_08":"", "ATTRIB_09":"", "ATTRIB_10":"Pak Lost Second ODI", "ATTRIB_11":0, "ATTRIB_12":0, "ATTRIB_13":0, "ATTRIB_14":0, "ATTRIB_15":0, "ATTRIB_16":0, "ATTRIB_17":0, "ATTRIB_18":"2019-03-31 23:12:39", "ATTRIB_19":"2019-03-31 23:12:39", "ATTRIB_20":"2019-03-31 23:12:39", "FLG_01":"", "FLG_02":"", "FLG_03":"", "FLG_04":"", "FLG_05":"", "FLG_06":"", "FLG_07":"", "FLG_08":"", "FLG_09":"", "FLG_10":"", "DIV_ID":0, "IMG_PTH":"", "created":"2019-03-31 23:19:51"},
      {"row_id":6, "bu_id":1, "stat_cd":"active", "type_cd":"Technology", "ATTRIB_01":"", "ATTRIB_02":"https://en.dailypakistan.com.pk/sports/australia-bat-first-against-pakistan-in-3rd-odi/", "ATTRIB_03":"", "ATTRIB_04":"", "ATTRIB_05":"", "ATTRIB_06":"", "ATTRIB_07":"", "ATTRIB_08":"", "ATTRIB_09":"", "ATTRIB_10":"Pak Lost third ODI", "ATTRIB_11":0, "ATTRIB_12":0, "ATTRIB_13":0, "ATTRIB_14":0, "ATTRIB_15":0, "ATTRIB_16":0, "ATTRIB_17":0, "ATTRIB_18":"2019-03-31 23:12:39", "ATTRIB_19":"2019-03-31 23:12:39", "ATTRIB_20":"2019-03-31 23:12:39", "FLG_01":"", "FLG_02":"", "FLG_03":"", "FLG_04":"", "FLG_05":"", "FLG_06":"", "FLG_07":"", "FLG_08":"", "FLG_09":"", "FLG_10":"", "DIV_ID":0, "IMG_PTH":"", "created":"2019-03-31 23:21:16"},
      {"row_id":7, "bu_id":1, "stat_cd":"active", "type_cd":"Technology", "ATTRIB_01":"", "ATTRIB_02":"https://www.samaa.tv/sports/2019/03/live-updates-pak-vs-aus-4th-odi-uae-2019/", "ATTRIB_03":"", "ATTRIB_04":"", "ATTRIB_05":"", "ATTRIB_06":"", "ATTRIB_07":"", "ATTRIB_08":"", "ATTRIB_09":"", "ATTRIB_10":"Pak Lost fourth ODI", "ATTRIB_11":0, "ATTRIB_12":0, "ATTRIB_13":0, "ATTRIB_14":0, "ATTRIB_15":0, "ATTRIB_16":0, "ATTRIB_17":0, "ATTRIB_18":"2019-03-31 23:12:39", "ATTRIB_19":"2019-03-31 23:12:39", "ATTRIB_20":"2019-03-31 23:12:39", "FLG_01":"", "FLG_02":"", "FLG_03":"", "FLG_04":"", "FLG_05":"", "FLG_06":"", "FLG_07":"", "FLG_08":"", "FLG_09":"", "FLG_10":"", "DIV_ID":0, "IMG_PTH":"", "created":"2019-03-31 23:21:52"},
      {"row_id":8, "bu_id":1, "stat_cd":"active", "type_cd":"Local", "ATTRIB_01":"", "ATTRIB_02":"https://www.samaa.tv/sports/2019/03/live-updates-pak-vs-aus-5th-odi-uae-2019/", "ATTRIB_03":"", "ATTRIB_04":"", "ATTRIB_05":"", "ATTRIB_06":"", "ATTRIB_07":"", "ATTRIB_08":"", "ATTRIB_09":"", "ATTRIB_10":"Pak Lost fifth ODI", "ATTRIB_11":0, "ATTRIB_12":0, "ATTRIB_13":0, "ATTRIB_14":0, "ATTRIB_15":0, "ATTRIB_16":0, "ATTRIB_17":0, "ATTRIB_18":"2019-03-31 23:12:39", "ATTRIB_19":"2019-03-31 23:12:39", "ATTRIB_20":"2019-03-31 23:12:39", "FLG_01":"", "FLG_02":"", "FLG_03":"", "FLG_04":"", "FLG_05":"", "FLG_06":"", "FLG_07":"", "FLG_08":"", "FLG_09":"", "FLG_10":"", "DIV_ID":0, "IMG_PTH":"", "created":"2019-03-31 23:22:35"},
      {"row_id":9, "bu_id":1, "stat_cd":"active", "type_cd":"Annoucements", "ATTRIB_01":"Ramzan timings will be reduced.", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":"", "ATTRIB_05":"", "ATTRIB_06":"", "ATTRIB_07":"", "ATTRIB_08":"", "ATTRIB_09":"", "ATTRIB_10":"Ramzan Timings", "ATTRIB_11":0, "ATTRIB_12":0, "ATTRIB_13":0, "ATTRIB_14":0, "ATTRIB_15":0, "ATTRIB_16":0, "ATTRIB_17":0, "ATTRIB_18":"2019-03-31 23:12:39", "ATTRIB_19":"2019-03-31 23:12:39", "ATTRIB_20":"2019-03-31 23:12:39", "FLG_01":"", "FLG_02":"", "FLG_03":"", "FLG_04":"", "FLG_05":"", "FLG_06":"", "FLG_07":"", "FLG_08":"", "FLG_09":"", "FLG_10":"", "DIV_ID":0, "IMG_PTH":"", "created":"2019-03-31 23:26:18"},
      {"row_id":10, "bu_id":1, "stat_cd":"active", "type_cd":"Annoucements", "ATTRIB_01":"It is expected to rain today. As our employees are delicate and soft please stay at home and stay safe ", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":"", "ATTRIB_05":"", "ATTRIB_06":"", "ATTRIB_07":"", "ATTRIB_08":"", "ATTRIB_09":"", "ATTRIB_10":"Rain Alert", "ATTRIB_11":0, "ATTRIB_12":0, "ATTRIB_13":0, "ATTRIB_14":0, "ATTRIB_15":0, "ATTRIB_16":0, "ATTRIB_17":0, "ATTRIB_18":"2019-03-31 23:12:39", "ATTRIB_19":"2019-03-31 23:12:39", "ATTRIB_20":"2019-03-31 23:12:39", "FLG_01":"", "FLG_02":"", "FLG_03":"", "FLG_04":"", "FLG_05":"", "FLG_06":"", "FLG_07":"", "FLG_08":"", "FLG_09":"", "FLG_10":"", "DIV_ID":0, "IMG_PTH":"", "created":"2019-03-31 23:27:42"},
      {"row_id":11, "bu_id":1, "stat_cd":"active", "type_cd":"Employee News", "ATTRIB_01":"We wish XYZ a very happy birthday. Please save your self from rain ", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":"", "ATTRIB_05":"", "ATTRIB_06":"", "ATTRIB_07":"", "ATTRIB_08":"", "ATTRIB_09":"", "ATTRIB_10":"Happy Birthday XYX", "ATTRIB_11":0, "ATTRIB_12":0, "ATTRIB_13":0, "ATTRIB_14":0, "ATTRIB_15":0, "ATTRIB_16":0, "ATTRIB_17":0, "ATTRIB_18":"2019-03-31 23:12:39", "ATTRIB_19":"2019-03-31 23:12:39", "ATTRIB_20":"2019-03-31 23:12:39", "FLG_01":"", "FLG_02":"", "FLG_03":"", "FLG_04":"", "FLG_05":"", "FLG_06":"", "FLG_07":"", "FLG_08":"", "FLG_09":"", "FLG_10":"", "DIV_ID":0, "IMG_PTH":"", "created":"2019-03-31 23:29:19"},
      {"row_id":12, "bu_id":1, "stat_cd":"active", "type_cd":"Employee News", "ATTRIB_01":"We wish ABC a very happy birthday. Please save your self from rain ", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":"", "ATTRIB_05":"", "ATTRIB_06":"", "ATTRIB_07":"", "ATTRIB_08":"", "ATTRIB_09":"", "ATTRIB_10":"Happy Birthday ABC", "ATTRIB_11":0, "ATTRIB_12":0, "ATTRIB_13":0, "ATTRIB_14":0, "ATTRIB_15":0, "ATTRIB_16":0, "ATTRIB_17":0, "ATTRIB_18":"2019-03-31 23:12:39", "ATTRIB_19":"2019-03-31 23:12:39", "ATTRIB_20":"2019-03-31 23:12:39", "FLG_01":"", "FLG_02":"", "FLG_03":"", "FLG_04":"", "FLG_05":"", "FLG_06":"", "FLG_07":"", "FLG_08":"", "FLG_09":"", "FLG_10":"", "DIV_ID":0, "IMG_PTH":"", "created":"2019-03-31 23:29:32"},
      {"row_id":13, "bu_id":1, "stat_cd":"active", "type_cd":"Company News", "ATTRIB_01":"This is my first news!", "ATTRIB_02":"", "ATTRIB_03":"", "ATTRIB_04":"", "ATTRIB_05":"", "ATTRIB_06":"", "ATTRIB_07":"", "ATTRIB_08":"", "ATTRIB_09":"", "ATTRIB_10":"First News", "ATTRIB_11":0, "ATTRIB_12":0, "ATTRIB_13":0, "ATTRIB_14":0, "ATTRIB_15":0, "ATTRIB_16":0, "ATTRIB_17":0, "ATTRIB_18":"2019-03-31 23:12:39", "ATTRIB_19":null, "ATTRIB_20":null, "FLG_01":"", "FLG_02":"", "FLG_03":"", "FLG_04":"", "FLG_05":"", "FLG_06":"", "FLG_07":"", "FLG_08":"", "FLG_09":"", "FLG_10":"", "DIV_ID":0, "IMG_PTH":"", "created":"2019-04-29 12:54:24"},
      {"row_id":14, "bu_id":1, "stat_cd":"active", "type_cd":"technology", "ATTRIB_01":"", "ATTRIB_02":"https://draftjs.org/docs/quickstart-rich-styling", "ATTRIB_03":"", "ATTRIB_04":"", "ATTRIB_05":"", "ATTRIB_06":"", "ATTRIB_07":"", "ATTRIB_08":"", "ATTRIB_09":"", "ATTRIB_10":"Draftjs", "ATTRIB_11":0, "ATTRIB_12":0, "ATTRIB_13":0, "ATTRIB_14":0, "ATTRIB_15":0, "ATTRIB_16":0, "ATTRIB_17":0, "ATTRIB_18":"2019-03-31 23:12:39", "ATTRIB_19":null, "ATTRIB_20":null, "FLG_01":"", "FLG_02":"", "FLG_03":"", "FLG_04":"", "FLG_05":"", "FLG_06":"", "FLG_07":"", "FLG_08":"", "FLG_09":"", "FLG_10":"", "DIV_ID":0, "IMG_PTH":"", "created":"2019-04-29 12:55:20"},
      // {"row_id":15, "bu_id":2, "stat_cd":"Active", "type_cd":"technology", "ATTRIB_01":"", "ATTRIB_02":"https://material-ui.com/api/text-field/", "ATTRIB_03":"", "ATTRIB_04":"", "ATTRIB_05":"", "ATTRIB_06":"", "ATTRIB_07":"", "ATTRIB_08":"", "ATTRIB_09":"", "ATTRIB_10":"Material UI Textfield", "ATTRIB_11":0, "ATTRIB_12":0, "ATTRIB_13":0, "ATTRIB_14":0, "ATTRIB_15":0, "ATTRIB_16":0, "ATTRIB_17":0, "ATTRIB_18":"2019-03-31 23:12:39", "ATTRIB_19":null, "ATTRIB_20":null, "FLG_01":"", "FLG_02":"", "FLG_03":"", "FLG_04":"", "FLG_05":"", "FLG_06":"", "FLG_07":"", "FLG_08":"", "FLG_09":"", "FLG_10":"", "DIV_ID":0, "IMG_PTH":"", "created":"2019-04-29 12:58:02"}
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('C_ORG_NEWS', null, {});
  }
};
