// Include React
var React = require("react");

// Include the Helper (for the saved recall)
var helpers = require("../utils/helpers");

// Creating the Results component
var TableList = React.createClass({

  getInitialState: function() {
    return { savedTables: [] };
  },

  handleDelete: function(item) {
    console.log("DELETE");
    console.log(item);

    // Delete!
    helpers.deleteSavedTable(item.name, item.project).then(function() {

      // Get the revised list!
      helpers.getSavedTables().then(function(tableData) {
        this.setState({ savedTables: tableData.data });
        console.log("saved results", tableData.data);
      }.bind(this));

    }.bind(this));
  },

  handleCreate: function() {
    console.log("TABLE CREATE INITIATED");

    // bring up table create form in editzone
    this.props.changeState("table");
  },

  handleSelect: function(item) {
    console.log("TABLE SELECTED");

    // bring up project as selected
    this.props.changeTable(item.name);
  },

  handleTemp: function() {
    helpers.getSavedTables(this.props.projectName).then(function(tableData) {
      this.setState({ savedTables: tableData.data });
      console.log("saved results", tableData.data);
    }.bind(this));
  },

  // Here we render the function
  renderContainer: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Tables</h3>
          <button style={{float: "right"}} className="btn btn-primary" onClick={() => this.handleTemp()}>#</button>
          <button style={{float: "right"}} className="btn btn-primary" onClick={() => this.handleCreate()}>+</button>
        </div>
        <div className="panel-body text-center bot-tier">
          {this.renderTables()}
        </div>
      </div>
    );
  },

  renderTables: function() {
    return this.state.savedTables.map(function(table, index) {
      return (
        <div key={index}>
            <p onClick={() => this.handleSelect(table)}>{table.name}</p>
            <button style={{float: "right"}} className="btn btn-primary deleter" onClick={() => this.handleDelete(table)}>X</button>
            <hr />
        </div>
      );
    }.bind(this));
  },

  render: function() {
    return this.renderContainer();
  }
});

// Export the component back for use in other files
module.exports = TableList;