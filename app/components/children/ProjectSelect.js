// Include React
var React = require("react");

// Include the Helper (for the saved recall)
var helpers = require("../utils/helpers");

// Creating the Results component
var ProjectSelect = React.createClass({
    
  getInitialState: function() {
    return { savedProjects: [] };
  },

  componentWillReceiveProps: function(nextProps) {
    if(JSON.stringify(this.props) !== JSON.stringify(nextProps))
        console.log("props changed");
        {
            helpers.getSavedProjects().then(function(projectData) {
                this.setState({ savedProjects: projectData.data });
                console.log("saved results", projectData.data);
            }.bind(this));
        }
  }, 

  handleDelete: function(item) {
    console.log("DELETE");
    console.log(item);

    // Delete!
    helpers.deleteSavedProject(item.name).then(function() {

    }.bind(this));

    this.props.changeState("delete" + item.name);
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

  handleRefresh: function() {
    helpers.getSavedProjects().then(function(projectData) {
      this.setState({ savedProjects: projectData.data });
      console.log("saved results", projectData.data);
    }.bind(this));
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
        <div id="headback" className="panel-heading">
          <h3 className="panel-title text-center">Projects</h3>
          <button style={{float: "right"}} className="btn btn-primary" onClick={() => this.handleCreate()}>
              <i className="fa fa-plus-square" aria-hidden="true"></i>
          </button>
        </div>
        <div className="panel-body text-center top-tier scroller">
          {this.renderProjects()}
        </div>
      </div>
    );
  },

  renderProjects: function() {
    return this.state.savedProjects.map(function(project, index) {
      if (project.name !== this.props.projectName) {
        return (
            <div key={index}>
                <h1 className="projItem" onClick={() => this.handleSelect(project)}>{project.name}</h1>
                <button id="projDeleter" style={{float: "right"}} className="btn btn-primary" onClick={() => this.handleDelete(project)}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
                <hr />
            </div>
        );
      } else {
          return (
            <div key={index}>
                <h1 className="projItem selectedProj" onClick={() => this.handleSelect(project)}>{project.name}</h1>
                <button id="projDeleter" style={{float: "right"}} className="btn btn-primary" onClick={() => this.handleDelete(project)}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
                <hr />
            </div>
        );
      }
    }.bind(this));
  },

  render: function() {
    return this.renderContainer();
  }
});

// Export the component back for use in other files
module.exports = ProjectSelect;