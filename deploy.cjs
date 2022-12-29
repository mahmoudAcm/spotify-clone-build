const fs = require("fs");
const path = require("path");
const copy = require("@mahmoudacm/copy");
const child_process = require("child_process");

const buildPath = path.resolve(__dirname, "../dist");
const deployPath = path.resolve(__dirname, "../gh-pages");

const dirs = fs.readdirSync(deployPath);
console.log(dirs);
for (let dir of dirs) {
  if (dir.startsWith(".git") || dir.startsWith("deploy.cjs")) continue;
  var __path = path.join(deployPath, dir);
  var stat = fs.statSync(__path);
  if (stat.isFile()) {
    fs.unlinkSync(__path);
  } else {
    fs.rmdirSync(__path, { recursive: true, force: true });
  }
}

copy(buildPath, deployPath);

child_process.execSync(
  'git add . && git commit -m "chore: new deploy" && git push && cd .. && git add gh-pages && git commit -m "deployed" && git push'
);
