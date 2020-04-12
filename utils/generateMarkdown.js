function generateMarkdown(responsesAll, data) {
  

  return `
# ${responsesAll.repoName}

${responsesAll.projDesc}.

------

## Tech/Framework Used

Project is created with:

${responsesAll.projTech}


## Installation

${responsesAll.projInstall}


## Usage

Describe the application's functionality:
${responsesAll.projUsage}


Insert images that demonstrate the application's functionality:

![screenshot 1](./Assets/image/screen_1.png)
![screenshot 2](./Assets/image/screen_2.png)


## Running tests

${responsesAll.projTests}


## License

This project is licensed under the ${responsesAll.projLicense} license.


## Contributing

Co-authors: ${responsesAll.projAuth}


Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


### Step 1

* Option 1:🍴 Fork this repo!

* Option 2: 👯 Clone this repo to your local machine using ${responsesAll.projCloneURL}

### Step 2

* HACK AWAY! 🔨🔨🔨

### Step 3

* 🔃 Create a new pull request using ${responsesAll.projPullURL}


`;
}

module.exports = generateMarkdown;
