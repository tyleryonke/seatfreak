// Include React
var React = require("react");

// Include the Helper (for the saved recall)
var helpers = require("../utils/helpers");

// Creating the Results component
var PersonList = React.createClass({

  getInitialState: function() {
    return { savedPersons: [], lastTask: "" };
  },


  componentWillReceiveProps: function(nextProps) {
    if(JSON.stringify(this.props) !== JSON.stringify(nextProps))
        {
            helpers.getSavedPersons(nextProps.projectName).then(function(personData) {
                this.setState({ savedPersons: personData.data });
                console.log("saved results", personData.data);
            }.bind(this));
        }
  }, 

  handleDelete: function(item) {
    console.log("DELETING");
    console.log(item);

    // Delete!
    helpers.deleteSavedPerson(item.firstName, item.lastName, item.table, item.project).then(function() {
      console.log("deleted");
      //this.handleRefresh();

    }.bind(this));
    this.props.changeState("delete" + item.firstName);
  },

  handleCreate: function() {
      console.log("clicked");
    if (this.props.projectName !== "") {
        console.log("PERSON CREATE INITIATED");

        // bring up person create form in editzone
        this.props.changeState("person");
    }
  },

  handleSelect: function(item) {
    console.log("PERSON SELECTED");

    // bring up project as selected
    this.props.changeState("personViewer");
    this.props.changePerson(item);
  },

  handleRefresh: function() {
    helpers.getSavedPersons(this.props.projectName).then(function(personData) {
      this.setState({ savedPersons: personData.data });
      console.log("saved results", personData.data);
    }.bind(this));
  },

//   componentWillMount: function() {
//     helpers.getSavedPersons().then(function(personData) {
//       this.setState({ savedPersons: personData.data });
//       console.log("saved results", personData.data);
//     }.bind(this));
//   },

  // Here we render the function
  renderContainer: function() {
    return (
      <div className="panel panel-default">
        <div id="headback" className="panel-heading">
          <h3 className="panel-title text-center">People</h3>
          <button id="bottomPlus" style={{float: "right"}} className="btn btn-primary" onClick={() => this.handleCreate()}>
              <i className="fa fa-plus-square" aria-hidden="true"></i>
          </button>
        </div>
        <div className="panel-body text-center bot-tier scroller">
          {this.renderPersons()}
        </div>
      </div>
    );
  },

  renderPersons: function() {
    return this.state.savedPersons.map(function(person, index) {
      return (
        <div key={index}>
            <p className="basicListItem" onClick={() => this.handleSelect(person)}>{person.firstName} {person.lastName}</p>
            <button style={{float: "right"}} className="btn btn-primary deleter" onClick={() => this.handleDelete(person)}>
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
module.exports = PersonList;