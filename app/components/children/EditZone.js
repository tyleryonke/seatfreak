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
         { savedProjects: [], savedTables: [], name: "", people: "", trait: "", firstName: "", lastName: "", table: "", tables: "" }
      );
  },

  handleUpdateTextInput: function(event) {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  },

  componentWillReceiveProps: function() {
      this.saveTableOptions();
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
        <div id="headback" className="panel-heading">
          <h3 className="panel-title text-center">Viewer</h3>
        </div>
        <div className="panel-body text-center top-tier scroller">
          <h1 id="emptyText">Select a Project to view Tables/People<br />then click Tables/People for info<br />or the Plus sign to add more!</h1>
        </div>
      </div>
    );
  },
  renderProjectEditor: function() {
    return (
      <div className="panel panel-default">
        <div id="headback" className="panel-heading">
          <h3 className="panel-title text-center">Viewer</h3>
        </div>
        <div className="panel-body text-center top-tier scroller">
          <form onSubmit={this.handleProjectSubmit}>
            <div className="form-group">
              <h4 className="">
                <strong>New Project</strong>
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
              <i className="fa fa-check-square" aria-hidden="true"></i><span>    Save</span></button>
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
        <div id="headback" className="panel-heading">
          <h3 className="panel-title text-center">Viewer</h3>
        </div>
        <div className="panel-body text-center top-tier scroller">
          <form onSubmit={this.handlePersonSubmit}>
            <div className="form-group">
              <h4 className="">
                <strong>New Person</strong>
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
              <input
                placeholder="Last Name"
                type="text"
                className="form-control text-center"
                id="lastName"
                defaultValue={this.state.lastName}
                onChange={(event) => this.handleUpdateTextInput(event)}
                required
              />
              <input
                placeholder="Trait"
                type="text"
                className="form-control text-center"
                id="trait"
                defaultValue={this.state.trait}
                onChange={(event) => this.handleUpdateTextInput(event)}
              />
              <select id="table" defaultValue="" onChange={(event) => this.handleUpdateTextInput(event)}>
                    <option value="" disabled>Table</option>
                    {
                    this.state.savedTables.map(function(table, index) {
                        return <option key={index}
                        value={table.name}>{table.name}</option>;
                    })
                    }
              </select>
              <button
                className="btn btn-primary saver"
                type="submit"
              >
              <i className="fa fa-check-square" aria-hidden="true"></i><span>    Save</span></button>
            </div>
          </form>
        </div>
      </div>
    );
  },

  saveTableOptions: function() {

      helpers.getSavedTables(this.props.project).then(function(tableData) {
                this.setState({ savedTables: tableData.data });
                console.log("saved results", tableData.data);
      }.bind(this));
  },
  // Here we render the function
  renderTableEditor: function() {
    return (
      <div className="panel panel-default">
        <div id="headback" className="panel-heading">
          <h3 className="panel-title text-center">Viewer</h3>
        </div>
        <div className="panel-body text-center top-tier scroller">
          <form onSubmit={this.handleTableSubmit}>
            <div className="form-group">
              <h4 className="">
                <strong>New Table</strong>
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
              <input
                placeholder="Trait"
                type="text"
                className="form-control text-center"
                id="trait"
                defaultValue={this.state.trait}
                onChange={(event) => this.handleUpdateTextInput(event)}
              />
              <button
                className="btn btn-primary saver"
                type="submit"
              >
              <i className="fa fa-check-square" aria-hidden="true"></i><span>    Save</span></button>
            </div>
          </form>
        </div>
      </div>
    );
  },
  renderPersonViewer: function() {
    var person = this.props.person;
    return (
      <div className="panel panel-default">
        <div id="headback" className="panel-heading">
          <h3 className="panel-title text-center">Viewer</h3>
        </div>
        <div className="panel-body text-center top-tier scroller">
            <div className="personViewText">
                <p>{person.firstName} {person.lastName}</p>
                <p>Trait: {person.trait}</p>
                <p>Table: {person.table}</p>
            </div>
        </div>
      </div>
    );
  },
  renderTableViewer: function() {
    var table = this.props.table;
    return (
      <div className="panel panel-default">
        <div id="headback" className="panel-heading">
          <h3 className="panel-title text-center">Viewer</h3>
        </div>
        <div className="panel-body text-center top-tier scroller">
            <div className="tableViewText">
                <p id="tableViewName">{table.name}</p>
                <p id="tableViewTrait">Trait: {table.trait}</p>
                <p>People ({table.people.length}):</p>
                {this.renderTablePeople(table)}
            </div>
        </div>
      </div>
    );
  },
  renderTablePeople: function(table) {
    return table.people.map(function(person, index) {
        return (
            <div key={index}>
                <p>{person.firstName} {person.lastName}</p>
            </div>
        );
    })
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
    else if (this.props.mode == "personViewer") {
        return this.renderPersonViewer();
    }
    else if (this.props.mode == "tableViewer") {
        return this.renderTableViewer();
    }
    else {
        return this.renderEmpty();
    }
  }
});

// Export the component back for use in other files
module.exports = EditZone;