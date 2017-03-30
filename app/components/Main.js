// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("./children/Form");

var EditZone = require("./children/EditZone");
var ProjectSelect = require("./children/ProjectSelect");
var TableList = require("./children/TableList");
var PersonList = require("./children/PersonList");

// Creating the Main component
var Main = React.createClass({
  getInitialState: function() {
    return {
      mode: "",
      project: "",
      person: "",
      table: "" 
    };
  },

  changeState: function(formType) {
    this.setState({mode: formType});
  },

  changeProj: function(projName) {
    this.setState({project: projName});
  },

  changeTable: function(tableName) {
    this.setState({table: tableName});
  },

  changePerson: function(personName) {
    this.setState({person: personName});
  },

  // Here we render the function
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-left" style={{display: "inline"}}>SeatFreak</h2>
            <img src={require("../assets/images/seatv1.png")} height="42" width="42"/>
            <span className="text-left">
              <em>   Seat... better!</em>
            </span>
            <span className="text-right" style={{float: "right"}}>
              <a href="/logout"><button type="button">Logout</button></a>
            </span>
          </div>

          <div className="col-md-3">

            <ProjectSelect changeState={this.changeState} changeProj={this.changeProj} />

          </div>

          <div className="col-md-9">

            <EditZone 
              changeState={this.changeState}
              mode={this.state.mode} 
              project={this.state.project} 
              person={this.state.person}
              table={this.state.table}
            />

          </div>

        </div>

        <div className="row">

          <div className="col-md-6">

            <TableList changeState={this.changeState} changeTable={this.changeTable} projectName={this.state.project} />

          </div>

          <div className="col-md-6">

            <PersonList changeState={this.changeState} changePerson={this.changePerson} projectName={this.state.project}/>

          </div>

        </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
