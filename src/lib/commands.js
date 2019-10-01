const { readSecrets, writeSecrets } = require("./secrets");
const crypto = require("crypto");

function get(key) {
  const secrets = readSecrets();
  const secret = secrets[key];

  const cryptoKey = crypto.createDecipher("aes-128-cbc", password);
  let decryptedSecret = cryptoKey.update(secret, "hex", "utf8");
  decryptedSecret += cryptoKey.final("utf8");
}

function set(key, value) {
  const cryptoKey = crypto.createCipher("aes-128-cbc", password);
  let encryptedValue = cryptoKey.update(value, "utf8", "hex");
  encryptedValue += cryptoKey.final("hex");
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
