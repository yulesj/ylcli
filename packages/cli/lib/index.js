import { gte } from "semver"
import { program } from 'commander';
import createInitCommand from "@ylcli.com/init"
import { log, isDebug } from "@ylcli.com/utils"
import chalk from 'chalk'

// const pkg = require("../package.json");
const pkg = {}

const LOWEST_NODE_VERSION = "17.0.0";

function checkNodeVersion() {
  log.verbose("node version", process.version);
  if (!gte(process.version, LOWEST_NODE_VERSION)) {
    throw new Error(chalk.red(`cli-yl 需要安装${LOWEST_NODE_VERSION}以上版本Node.js`));
  }
}

function preAction() {
  // 检查node 版本
  checkNodeVersion();
}

process.on("uncaughtException", (e) => {
  if (isDebug()) {
    console.log(e);
  } else {
    log.warn(e.message)
  }
});

function setup (args) {
  program
    .name(Object.keys(pkg.bin)[0])
    .usage("<command> [options]")
    .version(pkg.version)
    .option("-d, --debug", "是否开启调试模式", false)
    .hook("preAction", preAction);

  // 创建命令

  // 创建 init 命令
  createInitCommand(program);

  program.parse(process.argv);
};

export default setup
