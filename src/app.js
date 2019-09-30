const { handlePwRequests } = require("./lib/commands.js");

const [action, key, value] = process.argv.slice(2);

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const masterPassword = "Wurstinator";

rl.question("Please enter Masterpassword: ", password => {
  rl.output.write("\n");
  if (password === masterPassword) {
    handlePwRequests(action, key, value);
  } else {
    console.log("Wrong Password!!!");
  }

  rl.close();
});

rl._writeToOutput = function _writeToOutput() {
  rl.output.write("*");
};
