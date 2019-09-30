const { readSecrets, writeSecrets } = require("./Models/secrets");

function add(a, b) {
  const result = Number(a) + Number(b);
  return result;
}

const password = {
  WLAN: "HideJoKidsHideJoWifi",
  Steam: "H4ckz00r420",
  Blizzard: "WC3_)03n23b"
};

function get(key) {
  const secrets = readSecrets();
  const secret = secrets[key];
  console.log(secret);
}

function set(key, value) {
  const newSecrets = {
    [key]: value
  };
  console.log("PW set");
  writeSecrets(newSecrets);
}
function unset(key) {
  console.log("unset", key);
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

// function showProcessDetails() {
//   console.log(`Node Version: ${process.version}`);
//   console.log(`Plattform: ${process.platform} ${process.arch}`);
//   console.log(`Arguments: ${process.argv.join(" ")}`);
// }

handlePwSetting(action, key, value);
