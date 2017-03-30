// Include React
var React = require("react");

// Include the Helper (for the saved recall)
var helpers = require("../utils/helpers");

// Creating the Results component
var PersonList = React.createClass({

  getInitialState: function() {
    return { savedPersons: [] };
  },

  handleDelete: function(item) {
    console.log("DELETING");
    console.log(item);

    // Delete!
    helpers.deleteSavedPerson(item.name).then(function() {

      // Get the revised list!
      helpers.getSavedPersons().then(function(personData) {
        this.setState({ savedPersons: personData.data });
        console.log("saved results", personData.data);
      }.bind(this));

    }.bind(this));
  },

  handleCreate: function() {
    console.log("PERSON CREATE INITIATED");

    // bring up person create form in editzone
    this.props.changeState("person");
  },

  handleSelect: function(item) {
    console.log("PERSON SELECTED");

    // bring up project as selected
    this.props.changePerson(item.firstName + item.lastName);
  },

  handleTemp: function() {
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
        <div className="panel-heading">
          <h3 className="panel-title text-center">People</h3>
          <button style={{float: "right"}} className="btn btn-primary" onClick={() => this.handleTemp()}>#</button>
          <button style={{float: "right"}} className="btn btn-primary" onClick={() => this.handleCreate()}>+</button>
        </div>
        <div className="panel-body text-center bot-tier">
          {this.renderPersons()}
        </div>
      </div>
    );
  },

  renderPersons: function() {
    return this.state.savedPersons.map(function(person, index) {
      return (
        <div key={index}>
            <p onClick={() => this.handleSelect(person)}>{person.firstName} {person.lastName}</p>
            <button style={{float: "right"}} className="btn btn-primary deleter" onClick={() => this.handleDelete(person)}>X</button>
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