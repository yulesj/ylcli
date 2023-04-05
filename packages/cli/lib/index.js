const commander = require('commander')
const createInitCommand = require('@ylcli.com/init')

const { program } = commander
const pkg = require('../package.json')

module.exports = function (args) {
    program
      .name(Object.keys(pkg.bin)[0])
      .usage('<command> [options]')
      .version(pkg.version)
      .option('-d, --debug', '是否开启调试模式', false);

    // 创建命令  

    // 创建 init 命令
    createInitCommand(program)

    program.parse(process.argv)  
}