const log = require("npmlog");
const isDebug = require('./isDebug')

if (isDebug()) {
  log.level = "verbose";
} else {
  log.level = "info";
}

log.heading = 'yl-cli'

log.addLevel('success', 2000, { fg: 'green', bg: 'yellow', bold: true});


module.exports = log;
