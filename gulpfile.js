const { src, series } = require("gulp");
const clean = require("gulp-clean");
const shell = require("gulp-shell");
require('dotenv').config();

const stitch = require("./stitch.json");

function cleanTask() {
    return src(["./hosting/files"], { read: false, allowEmpty: true })
       .pipe(clean());
 }
 function generateTask() {
    return src("./hugo", { read: true })
       .pipe(shell([
             `cd <%= file.path %> && hugo --baseURL https://${stitch.hosting.app_default_domain}`
       ]));
 }
 function deployTask() {
    return src("./hosting", { read: true })
       .pipe(shell([
             `stitch-cli login --private-api-key=${process.env.STITCH_PRIVATE_API_KEY} --api-key=${process.env.STITCH_API_KEY} --yes`,
             `stitch-cli import --include-hosting --yes`
       ]));
 }
exports.clean = cleanTask;
exports.generate = generateTask;
exports.build = series(cleanTask, generateTask);
exports.deploy = series(cleanTask, generateTask, deployTask);
