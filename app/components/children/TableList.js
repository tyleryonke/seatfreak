// Include React
var React = require("react");

// Include the Helper (for the saved recall)
var helpers = require("../utils/helpers");

// Creating the Results component
var TableList = React.createClass({

  getInitialState: function() {
    return { savedTables: [], lastTask: "" };
  },

  componentWillReceiveProps: function(nextProps) {
    if(JSON.stringify(this.props) !== JSON.stringify(nextProps))
        {
            helpers.getSavedTables(nextProps.projectName).then(function(tableData) {
                this.setState({ savedTables: tableData.data });
                console.log("saved results", tableData.data);
            }.bind(this));
        }
  }, 

  handleDelete: function(item) {
    console.log("DELETE");
    console.log(item);

    // Delete!
    helpers.deleteSavedTable(item.name, item.project).then(function() {

      console.log("deleted");
      
      //this.handleRefresh();

    }.bind(this));
    this.props.changeState("delete" + item.name);
  },

  handleCreate: function() {
    if (this.props.projectName !== "") {
        console.log("TABLE CREATE INITIATED");

        // bring up table create form in editzone
        this.props.changeState("table");
    }
  },

  handleSelect: function(item) {
    console.log("TABLE SELECTED");

    // bring up project as selected
    this.props.changeState("tableViewer");
    this.props.changeTable(item);
  },
  
  handleRefresh: function() {
      helpers.getSavedTables(this.props.projectName).then(function(tableData) {
            this.setState({ savedTables: tableData.data });
            console.log("saved results", tableData.data);
      }.bind(this));
  },

  // Here we render the function
  renderContainer: function() {
    return (
      <div className="panel panel-default">
        <div id="headback" className="panel-heading">
          <h3 className="panel-title text-center">Tables</h3>
          <button id="bottomPlus" style={{float: "right"}} className="btn btn-primary" onClick={() => this.handleCreate()}>
              <i className="fa fa-plus-square" aria-hidden="true"></i>
          </button>
        </div>
        <div className="panel-body text-center bot-tier scroller">
          {this.renderTables()}
        </div>
      </div>
    );
  },

  renderTables: function() {
    return this.state.savedTables.map(function(table, index) {
      return (
        <div key={index}>
            <p className="basicListItem" onClick={() => this.handleSelect(table)}>{table.name}</p>
            <button style={{float: "right"}} className="btn btn-primary deleter" onClick={() => this.handleDelete(table)}>
                <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
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