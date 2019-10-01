const crypto = require("crypto");
const fs = require("fs");

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 2048, 32, "sha512")
    .toString("hex");
  return [salt, hash].join("$");
}

const fileName = "master.txt";

function readMaster() {
  try {
    const master = fs.readFileSync(fileName, "utf-8");
    return master;
  } catch (error) {
    return false;
  }
}

function writeMaster(secret) {
  fs.writeFileSync(fileName, secret);
}

exports.hashPassword = hashPassword;
exports.writeMaster = writeMaster;
exports.readMaster = readMaster;
