const fs = require("fs");

const fileName = "secrets.json";
function readSecrets() {
  try {
    const secretsJSON = fs.readFileSync("secrets.json", "utf-8");
    secrets = JSON.parse(secretsJSON);
    return secrets;
  } catch (error) {
    console.log("Es wurden noch keine Passwörter gespeichert");
    writeSecrets({});
    return {};
  }
}

function writeSecrets(secrets) {
  fs.writeFileSync("secrets.json", JSON.stringify(secrets));
}

exports.readSecrets = readSecrets;
exports.writeSecrets = writeSecrets;
