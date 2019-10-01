const { handlePwRequests } = require("./lib/commands.js");

const [action, key, value] = process.argv.slice(2);

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const masterPasswordHash = "";

rl.question("Please enter Masterpassword: ", password => {
  rl.output.write("\n");
  if (verifyHash(password, masterPasswordHash)) {
    handlePwRequests(action, key, value);
  } else {
    console.log("Wrong Password!!!");
  }

  rl.close();
});

rl._writeToOutput = function _writeToOutput() {
  rl.output.write("*");
};

// Checking the password hash
function verifyHash(password, original) {
  const originalHash = original.split("$")[1];
  const salt = original.split("$")[0];
  const hash = crypto
    .pbkdf2Sync(password, salt, 2048, 32, "sha512")
    .toString("hex");

  return hash === originalHash;
}
