const { readSecrets, writeSecrets } = require("./secrets");

function get(key) {
  const secrets = readSecrets();
  const secret = secrets[key];
  console.log(secret);
}

function set(key, value) {
  const secrets = readSecrets();
  secrets[key] = value;
  console.log("PW set");
  writeSecrets(secrets);
}
function unset(key) {
  const secrets = readSecrets();
  delete secrets[key];
  writeSecrets(secrets);
}

exports.handlePwRequests = function handlePwRequests(action, key, value) {
  switch (action) {
    case "set":
      set(key, value);
      break;
    case "get":
      get(key);
      break;
    case "unset":
      unset(key);
      break;
    default:
      throw new Error("unknown action");
  }
};
