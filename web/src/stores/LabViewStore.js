var React = require("react");
var AGDispatcher = require("../dispatcher/AGDispatcher");
var AGConstants = require("../constants/AGConstants");
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var mockData = require("./mockData.js");

var ActionTypes = AGConstants.ActionTypes;

var CHANGE_EVENT = "change";

var _selectedStudentIndex = 0;    // default 0 - first student
var _selectedLabIndex = 0;        // default 0 - first lab of student 0


var _rawData = mockData.students;
var _students = _rawData;

function queryStudents(query) {
  _query = [];
  _theStudents = _students;
  var query = query.toLowerCase();
  if(!query) {
    console.log(_theStudents);
    return _rawData;
  }
  console.log("NOT EMPTY");
  _theStudents.forEach(function(currentStud) {
    var uname = currentStud.username.toLowerCase().search(query);
    var fname = currentStud.firstName.toLowerCase().search(query);
    var lname = currentStud.lastName.toLowerCase().search(query);

    if(uname >= 0 || fname >= 0 || lname >= 0) {
      _query.push(currentStud);
    }
  });
  return _query;
}

function getStudentLabs() {
  return _students;
}

function updateStudentList(newList) {
  _students = newList;
}

function setSelectedStudentLab(studentIndex,labIndex) {

  // first- remove the old selected lab
  _students[_selectedStudentIndex].labs[_selectedLabIndex].isSelected = false;
  _selectedStudentIndex = studentIndex;
  _selectedLabIndex = labIndex;
  _students[_selectedStudentIndex].labs[_selectedLabIndex].isSelected = true;

}

// Toggle currently selected student's lab
function toggleApprovalStudentLab() {
  toggleLabApproval(_selectedStudentIndex,_selectedLabIndex);
}

function getSelectedStudentLab() {
  return _students[_selectedStudentIndex].labs[_selectedLabIndex];
}

// Toggle lab using index of student and lab number
function toggleLabApproval(sIndex,lIndex) {
  _students[sIndex].labs[lIndex].approved = !_students[sIndex].labs[lIndex].approved;
}


var LabViewStore = assign({},EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback){
    this.on(CHANGE_EVENT,callback);
  },
  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT,callback);
  },
  getStudentLabs: function() {
    return _students;
  },

  getSelectedStudent: function() {
    return _students[_selectedStudentIndex];
  },
  getSelectedStudentLab: function() {
    return getSelectedStudentLab();
  },
  setSelectedStudentLab: function(studentIndex,labIndex) {
    setSelectedStudentLab(studentIndex,labIndex);
  },
});
LabViewStore.dispatchToken = AGDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.RECEIVE_RAW_STUDENTLABS:
      getStudentLabs();
      LabViewStore.emitChange();
      break;
    case ActionTypes.RECEIVE_SELECTED_LAB:
      getSelectedStudentLab();
      LabViewStore.emitChange();
      break;
    case ActionTypes.SET_SELECTED_STUDENTLAB:
      setSelectedStudentLab(action.studentIndex, action.labIndex);
      LabViewStore.emitChange();
      break;
    case ActionTypes.TOGGLE_APPROVAL_STUDENTLAB:
      // toggle the lab based on _selected indexes. Might
      // change this to an input from the element?
      toggleApprovalStudentLab();
      LabViewStore.emitChange();
      break;
    case ActionTypes.SEARCH_FOR_STUDENT:
      var keep = queryStudents(action.query);
      updateStudentList(keep);
      LabViewStore.emitChange();
      updateStudentList(keep);
      break;
    default:
      // do nothing here
  }
});

module.exports = LabViewStore;
