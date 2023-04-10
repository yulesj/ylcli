import log from "npmlog"
console.log('asdsad')

import isDebug from './isDebug.js'

if (isDebug()) {
  log.level = "verbose";
} else {
  log.level = "info";
}

log.heading = 'yl-cli'

log.addLevel('success', 2000, { fg: 'green', bg: 'yellow', bold: true });


export default log;
