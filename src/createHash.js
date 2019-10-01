const { hashPassword, writeMaster } = require("./lib/password.js");

writeMaster(hashPassword(process.argv[2]));
