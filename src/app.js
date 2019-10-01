const { handlePwRequests } = require("./lib/commands.js");
const crypto = require("crypto");
const readline = require("readline");
const { readMaster } = require("./lib/password.js");

const [action, key, value] = process.argv.slice(2);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const masterPasswordHash = readMaster();

if (masterPasswordHash) {
  rl.question("Please enter Masterpassword: ", password => {
    rl.output.write("\n");
    if (verifyHash(password, masterPasswordHash)) {
      handlePwRequests(password, action, key, value);
    } else {
      console.log("Wrong Password!!!");
    }

    rl.close();
  });

  rl._writeToOutput = function _writeToOutput() {
    rl.output.write("*");
  };
} else {
  console.log("No Master-Password yet. Please run createHash.js");
  rl.close();
}

// Checking the password hash
function verifyHash(password, original) {
  const originalHash = original.split("$")[1];
  const salt = original.split("$")[0];
  const hash = crypto
    .pbkdf2Sync(password, salt, 2048, 32, "sha512")
    .toString("hex");

  return hash === originalHash;
}
