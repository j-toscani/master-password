const { readSecrets, writeSecrets } = require("./Models/secrets");

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

const [action, key, value] = process.argv.slice(2);

function handlePwSetting(action, key, value) {
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
}

handlePwSetting(action, key, value);
