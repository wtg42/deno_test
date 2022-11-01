import inquirer from "npm:inquirer@8.0.0";

inquirer
  .prompt([
    /* Pass your questions in here */
    {
      type: "input",
      name: "Name",
      message: "Your Name?",
    },
  ])
  .then((answers) => {
    console.log(answers);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
