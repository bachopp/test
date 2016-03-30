var React = require("react")

// react-bootstrap requires
var Button = require("react-bootstrap").Button
var Col = require("react-bootstrap").Col
var Grid = require("react-bootstrap").Grid
var Row = require("react-bootstrap").Row
// react-router requires
var Link = require("react-router").Link
// local requires
var CenterWrapper = require("./CenterWrapper.jsx")

var CoursesStore = require("../../stores/CoursesStore.js");
var CoursesAPIUtils = require("../../utils/CoursesAPIUtils.js")


function getStateFromStores() {
  return {
    roles: CoursesStore.getAllCourses(),
  };
}

var Courses = React.createClass({
  getInitialState: function() {
    // Calls for initial data from server on first render cycle only.
    CoursesAPIUtils.getAllCourses();
    return getStateFromStores();
  },

  componentDidMount: function() {
    CoursesStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    CoursesStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var courses = this.state.courses;
    var roles = this.state.roles;
    return (
      <div>
      <Col xs={12}>
        <h1>View courses</h1>
      </Col>
      <Row>
          <CenterWrapper roles={roles}/>
          {this.props.children}
      </Row>
      </div>
    )
  },
  _onChange: function() {
    this.setState(getStateFromStores());
  },
})


module.exports = Courses;
