var React = require("react");
var ReactDOM = require("react-dom");

var Col = require("react-bootstrap").Col;
var ButtonGroup = require("react-bootstrap").ButtonGroup;
var ButtonToolbar = require("react-bootstrap").ButtonToolbar;
var Button = require("react-bootstrap").Button;
var Input = require("react-bootstrap").Input;
var Glyphicon = require("react-bootstrap").Glyphicon;
var Table = require("react-bootstrap").Table;
var ProgressBar = require("react-bootstrap").ProgressBar;
var Row = require("react-bootstrap").Row;


var TeacherSideNav = require("../components/TeacherSideNav/TeacherSideNav.jsx");
var Listview = require("../components/student.listview/Listview.jsx");
var Coursetabs = require("../components/coursenavigation/Coursetabs.jsx");


var Labview = require("../components/labview.detailed/Labview.jsx");
// local components

var Coursepage = React.createClass({

  render: function() {
    const innerSearch = <Glyphicon glyph="search"/>;

    return(
      <Col xs={12}>
        <Col xs={7} className="infoboxleft">
            <Listview/>
        </Col>
        <Col xs={5} className="infoboxright">
            <Labview/>
        </Col>
      </Col>
    );
  }
});

module.exports = Coursepage;
