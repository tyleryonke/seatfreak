// Include React
var React = require("react");

// Include the Helper (for the saved recall)
var helpers = require("../utils/helpers");

var ProjectSelect = require("./ProjectSelect");
var TableList = require("./TableList");
var PersonList = require("./PersonList");

// Creating the Results component
var EditZone = React.createClass({
  getInitialState: function() {
      return(
         { name: "", people: "", trait: "", firstName: "", lastName: "", table: "", tables: "" }
      );
  },

  handleUpdateTextInput: function(event) {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  },

  handleProjectSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();

    helpers.postSavedProject(this.state.name).then(function() {
      console.log("CREATED PROJECT");
    });
    this.props.changeState("");
    this.state.name = "";
  },
  handlePersonSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();

    helpers.postSavedPerson(this.state.firstName, this.state.lastName, this.state.trait, this.state.table, this.props.project).then(function() {
      console.log("CREATED PERSON");
    });
    this.props.changeState("");
    this.state.firstName = "";
    this.state.lastName = "";
    this.state.trait = "";
    this.state.table = "";
  },
  handleTableSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();

    helpers.postSavedTable(this.state.name, this.state.trait, this.props.project).then(function() {
      console.log("CREATED TABLE");
    });
    this.props.changeState("");
    this.state.name = "";
    this.state.trait = "";
  },
  // Here we render the function
  renderEmpty: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Viewer</h3>
        </div>
        <div className="panel-body text-center top-tier">
          <h1>SELECT A PROJECT/PERSON/TABLE TO VIEW</h1>
        </div>
      </div>
    );
  },
  renderProjectEditor: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Viewer</h3>
        </div>
        <div className="panel-body text-center top-tier">
          <form onSubmit={this.handleProjectSubmit}>
            <div className="form-group">
              <h4 className="">
                <strong>Project</strong>
              </h4>
              <input
                placeholder="Name"
                type="text"
                className="form-control text-center"
                id="name"
                defaultValue={this.state.name}
                onChange={(event) => this.handleUpdateTextInput(event)}
                required
              />
              <button
                className="btn btn-primary saver"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  },
  // Here we render the function
  renderPersonEditor: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Viewer</h3>
        </div>
        <div className="panel-body text-center top-tier">
          <form onSubmit={this.handlePersonSubmit}>
            <div className="form-group">
              <h4 className="">
                <strong>Person</strong>
              </h4>
              <input
                placeholder="First Name"
                type="text"
                className="form-control text-center"
                id="firstName"
                defaultValue={this.state.firstName}
                onChange={(event) => this.handleUpdateTextInput(event)}
                required
              />
              <br />
              <input
                placeholder="Last Name"
                type="text"
                className="form-control text-center"
                id="lastName"
                defaultValue={this.state.lastName}
                onChange={(event) => this.handleUpdateTextInput(event)}
                required
              />
              <br />
              <input
                placeholder="Trait"
                type="text"
                className="form-control text-center"
                id="trait"
                defaultValue={this.state.trait}
                onChange={(event) => this.handleUpdateTextInput(event)}
              />
              <br />
              <input list="tableList" placeholder="Table" id="table" className="form-control text-center" defaultValue={this.state.table} onChange={(event) => this.handleUpdateTextInput(event)} />
                <datalist id="tableList">
                    <option value="Table 1" />
                    <option value="Table 2" />
                </datalist>
              <br />
              <button
                className="btn btn-primary saver"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  },
  // Here we render the function
  renderTableEditor: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Viewer</h3>
        </div>
        <div className="panel-body text-center top-tier">
          <form onSubmit={this.handleTableSubmit}>
            <div className="form-group">
              <h4 className="">
                <strong>Table</strong>
              </h4>
              <input
                placeholder="Name"
                type="text"
                className="form-control text-center"
                id="name"
                defaultValue={this.state.name}
                onChange={(event) => this.handleUpdateTextInput(event)}
                required
              />
              <br />
              <input
                placeholder="Trait"
                type="text"
                className="form-control text-center"
                id="trait"
                defaultValue={this.state.trait}
                onChange={(event) => this.handleUpdateTextInput(event)}
              />
              <br />
              <button
                className="btn btn-primary saver"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  },
  // Here we render the function
  render: function() {
    if (this.props.mode == "project") {
        return this.renderProjectEditor();
    }
    else if (this.props.mode ==  "person") {
        return this.renderPersonEditor();
    }
    else if (this.props.mode == "table") {
        return this.renderTableEditor();
    }
    else {
        return this.renderEmpty();
    }
  }
});

// Export the component back for use in other files
module.exports = EditZone;