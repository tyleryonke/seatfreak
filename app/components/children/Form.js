// Include React
var React = require("react");

// Creating the Form component
var Form = React.createClass({

  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    return { term: "" };
  },

  // This function will respond to the user input
  handleChange: function(event) {

    this.setState({ term: event.target.value });

  },

  // When a user submits...
  handleSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();

    // Set the parent to have the search term
    this.props.setTerm(this.state.term);
    this.props.setTerm(this.state.term);
    this.props.setTerm(this.state.term);
    this.props.setTerm(this.state.term);
  },
  // Here we describe this component's render method
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Query</h3>
        </div>
        <div className="panel-body text-center">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <h4 className="">
                <strong>Person</strong>
              </h4>

              {/*
                Note how each of the form elements has an id that matches the state.
                This is not necessary but it is convenient.
                Also note how each has an onChange event associated with our handleChange event.
              */}
              <input
                value={this.state.firstName}
                type="text"
                className="form-control text-center"
                id="firstName"
                onChange={this.handleFirstNameChange}
                required
              />
              <br />
              <input
                value={this.state.lastName}
                type="text"
                className="form-control text-center"
                id="lastName"
                onChange={this.handleLastNameChange}
                required
              />
              <br />
              <input
                value={this.state.table}
                type="number"
                className="form-control text-center"
                id="table"
                onChange={this.handleTableChange}
              />
              <br />
              <input
                value={this.state.trait}
                type="number"
                className="form-control text-center"
                id="trait"
                onChange={this.handleTableChange}
              />
              <br />
              <button
                className="btn btn-primary"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Form;
