const inquirer = require("inquirer");
const fs = require("fs");
const axios = require('axios');
const generateMarkdown = require("./utils/generateMarkdown.js");

// create object with responses to pass into generateMarkdown
const responsesAll = {};

// create array with github and readme questions
const questionsGit = [
  {
	type: "input",
	message: "What is your Github username?",
	name: "gitUser"
  },
  {
	type: "password",
	message: "Enter your password:",
	name: "gitPass"
  },
  {
  type: "input",
  message: "What is the name of your Github repository?",
  name: "repoName"
  },
  {
  type: "input",
  message: "Enter a project description:",
  name: "projDesc"
  },
  {
  type: "input",
  message: "Which tech frameworks were used:",
  name: "projTech"
  },
  {
  type: "input",
  message: "Enter any installation instructions:",
  name: "projInstall"
  },
  {
  type: "input",
  message: "Describe the application's functionality:",
  name: "projUsage"
  },
  {
  type: "list",
  message: "Enter the license:",
  choices: ["MIT", "Apache", "GPL"],
  name: "projLicense"
  },
  {
  type: "input",
  message: "Enter any other contributing authors:",
  name: "projAuth"
  },
  {
  type: "input",
  message: "Explain how to run the automated tests for this system:",
  name: "projTests"
  },
];


inquirer
  .prompt(questionsGit)
  .then(function(questionResponse) {

  console.log('Done');
  console.log('Github user: ', questionResponse.gitUser);
  // console.log("questionResponse: ", questionResponse);


  const queryURL = () => {
      var queryURL = "https://api.github.com/repos/" + questionResponse.gitUser + "/" + questionResponse.repoName;
      // return axios.get for queryURL response
      return axios.get(queryURL)
  };

  const queryURLUser = () => {
      var queryURLUser = "https://api.github.com/users/" + questionResponse.gitUser;
      // return axios.get for queryURLUser response
      return axios.get(queryURLUser);
  };


    axios.all([queryURL(), queryURLUser()])
    .then(axios.spread(function (queryResponse, queryResponseUser) {

      responsesAll.gitUser = questionResponse.gitUser;

      // repo name ex: Hooking-Up-in-Your-Hood
      responsesAll.repoName = questionResponse.repoName;
      responsesAll.projDesc = questionResponse.projDesc;
      responsesAll.projTech = questionResponse.projTech;
      responsesAll.projInstall = questionResponse.projInstall;
      responsesAll.projUsage = questionResponse.projUsage;
      responsesAll.projLicense = questionResponse.projLicense;
      responsesAll.projAuth = questionResponse.projAuth;
      responsesAll.projTests = questionResponse.projTests;

      // format for project clone URL:
      // https://github.com/[username]/[repo-name].git
      responsesAll.projCloneURL = "https://github.com/" + questionResponse.gitUser + "/" + queryResponse.data.name + ".git";

      // format for project pull URL:
      // https://github.com/[username]/[repo-name]/compare
      responsesAll.projPullURL = "https://github.com/" + questionResponse.gitUser + "/" + queryResponse.data.name + "/compare";

      console.log("responsesAll.gitUser: ", responsesAll.gitUser);
      console.log("responsesAll.repoName: ", responsesAll.repoName);
      console.log("responsesAll.projCloneURL: ", responsesAll.projCloneURL);
      console.log("responsesAll.projPullURL: ", responsesAll.projPullURL);


      const writeToFile = (responsesAll, data) => {

        fs.writeFile("README_template.md", generateMarkdown(responsesAll, data))

        
    };
      // writeToFile(queryResponse, queryResponseUser, responsesAll);
      writeToFile(responsesAll);

       

  }));


});









