const { readSecrets, writeSecrets } = require("./secrets");
const crypto = require("crypto");

function get(password, key) {
  const secrets = readSecrets();
  const secret = secrets[key];

  const cryptoKey = crypto.createDecipher("aes-128-cbc", password);
  let decryptedSecret = cryptoKey.update(secret, "hex", "utf8");
  decryptedSecret += cryptoKey.final("utf8");

  console.log(decryptedSecret);
}

function set(password, key, value) {
  const cryptoKey = crypto.createCipher("aes-128-cbc", password);
  let encryptedValue = cryptoKey.update(value, "utf8", "hex");
  encryptedValue += cryptoKey.final("hex");

  const secrets = readSecrets();
  secrets[key] = encryptedValue;

  console.log("PW set");

  writeSecrets(secrets);
}
function unset(password, key) {
  const secrets = readSecrets();
  delete secrets[key];
  writeSecrets(secrets);
}

exports.handlePwRequests = function handlePwRequests(
  password,
  action,
  key,
  value
) {
  switch (action) {
    case "set":
      set(password, key, value);
      break;
    case "get":
      get(password, key);
      break;
    case "unset":
      unset(password, key);
      break;
    default:
      throw new Error("unknown action");
  }
};
