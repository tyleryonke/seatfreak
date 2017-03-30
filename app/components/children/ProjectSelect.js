// Include React
var React = require("react");

// Include the Helper (for the saved recall)
var helpers = require("../utils/helpers");

// Creating the Results component
var ProjectSelect = React.createClass({
    
  getInitialState: function() {
    return { savedProjects: [] };
  },

  handleClick: function(item) {
    console.log("CLICKED");
    console.log(item);

    // Delete!
    helpers.deleteSavedProject(item.name).then(function() {

      // Get the revised list!
      helpers.getSavedProjects().then(function(projectData) {
        this.setState({ savedProjects: projectData.data });
        console.log("saved results", projectData.data);
      }.bind(this));

    }.bind(this));
  },

  handleCreate: function() {
    console.log("PROJECT CREATE INITIATED");

    // bring up project create form in editzone
    this.props.changeState("project");
  },

  handleSelect: function(item) {
    console.log("PROJECT SELECTED");

    // bring up project as selected
    this.props.changeProj(item.name);
  },

  componentWillMount: function() {
    helpers.getSavedProjects().then(function(projectData) {
      this.setState({ savedProjects: projectData.data });
      console.log("saved results", projectData.data);
    }.bind(this));
  },

  // Here we render the function
  renderContainer: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Projects</h3>
          <button style={{float: "right"}} className="btn btn-primary" onClick={() => this.handleCreate()}>+</button>
        </div>
        <div className="panel-body text-center top-tier">
          {this.renderProjects()}
        </div>
      </div>
    );
  },

  renderProjects: function() {
    return this.state.savedProjects.map(function(project, index) {
      return (
        <div key={index}>
            <h1 onClick={() => this.handleSelect(project)}>{project.name}</h1>
            <button style={{float: "right"}} className="btn btn-primary" onClick={() => this.handleClick(project)}>X</button>
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
module.exports = ProjectSelect;