var AGDispatcher = require("../dispatcher/AGDispatcher.js");
var AGConstants = require("../constants/AGConstants.js");

var ActionTypes = AGConstants.ActionTypes;

module.exports = {

  addStudentToGroup: function(rawStudent) {
    AGDispatcher.dispatch({
      type: ActionTypes.ADD_TO_GROUP,
      rawStudent: rawStudent,
    });

    // TODO: send the data to server
  },
};
