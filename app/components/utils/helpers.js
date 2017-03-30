// Include the Axios library for HTTP requests
var axios = require("axios");

// Helper Functions
var helpers = {

  // This will return any saved projects from our database
  getSavedProjects: function() {
    return axios.get("/api/saved/projects")
      .then(function(results) {
        console.log("axios results", results);
        return results;
      });
  },
  // This will return any saved people from our database
  getSavedPersons: function(project) {
    return axios.get("/api/saved/people", {
      params: {
        "project": project
      }
    })
      .then(function(results) {
        console.log("axios results", results);
        return results;
      });
  },
  // This will return any saved tables from our database
  getSavedTables: function(project) {
    return axios.get("/api/saved/tables", {
      params: {
        "project": project
      }
    })
      .then(function(results) {
        console.log("axios results", results);
        return results;
      });
  },
  // This will save new projects to our database
  postSavedProject: function(name) {
    var newProject = { name: name };
    return axios.post("/api/saved/projects", newProject)
      .then(function(response) {
        console.log("axios results", response.data._id);
        return response.data._id;
      });
  },
  // This will save new people to our database
  postSavedPerson: function(firstName, lastName, trait, table, project) {
    var newPerson = { firstName: firstName, lastName: lastName, trait: trait, table: table, project: project };
    return axios.post("/api/saved/people", newPerson)
      .then(function(response) {
        console.log("axios results", response.data._id);
        return response.data._id;
      });
  },
  // This will save new tables to our database
  postSavedTable: function(name, trait, project) {
    var newTable = { name: name, trait: trait, project: project };
    return axios.post("/api/saved/tables", newTable)
      .then(function(response) {
        console.log("axios results", response.data._id);
        return response.data._id;
      });
  },
  // This will remove saved projects from our database
  deleteSavedProject: function(name) {
    return axios.delete("/api/saved/projects", {
      params: {
        "name": name
      }
    })
    .then(function(results) {
      console.log("axios results", results);
      return results;
    });
  },
  // This will remove saved people from our database
  deleteSavedPerson: function(firstName, lastName) {
    return axios.delete("/api/saved/people", {
      params: {
        "firstName": firstName,
        "lastName": lastName
      }
    })
    .then(function(results) {
      console.log("axios results", results);
      return results;
    });
  },
  // This will remove saved tables from our database
  deleteSavedTable: function(name, project) {
    return axios.delete("/api/saved/tables", {
      params: {
        "name": name,
        "project": project
      }
    })
    .then(function(results) {
      console.log("axios results", results);
      return results;
    });
  }
};


// We export the helpers function
module.exports = helpers;
