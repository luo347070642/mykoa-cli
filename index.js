#! node

var fs = require("fs");
var path = require("path");

var config = {};
process.argv.slice(2).forEach(function (item) {
  config.projectName = "mykoa";
  if (item.indexOf("n:") != -1) {
    config.projectName = item.split(":")[1];
  }
  switch (item) {
    case "-ts":
      config.ts = true;
      break;
  }
});

function copyTemplate(from, to) {
  from = path.join(__dirname, "templates", from);
  write(to, fs.readFileSync(from, "utf-8"));
}

function write(path, str, mode) {
  fs.writeFileSync(path, str);
}

function mkdir(path, fn) {
  fs.mkdir(path, function (err) {
    fn && fn();
  });
}

var PATH = "./" + config.projectName;

mkdir(PATH, function () {
  copyTemplate("package.json", PATH + "/package.json");
  mkdir(PATH + "/app", function () {
    mkdir(PATH + "/app/controllers", function () {
      copyTemplate(
        "app/controllers/home.js",
        PATH + "/app/controllers/home.js"
      );
      copyTemplate(
        "app/controllers/users.js",
        PATH + "/app/controllers/users.js"
      );
    });
    mkdir(PATH + "/app/models", function () {
      copyTemplate("app/models/users.js", PATH + "/app/models/users.js");
    });
    mkdir(PATH + "/app/routes", function () {
      copyTemplate("app/routes/index.js", PATH + "/app/routes/index.js");
      copyTemplate("app/routes/home.js", PATH + "/app/routes/home.js");
      copyTemplate("app/routes/users.js", PATH + "/app/routes/users.js");
    });
    mkdir(PATH + "/app/public");
    copyTemplate("app/index.js", PATH + "/app/index.js");
    copyTemplate("app/config.js", PATH + "/app/config.js");
  });
});

console.log("build complete.");
console.log(' use "npm i" init project.');
