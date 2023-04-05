const { log } = require('@ylcli.com/utils')
const Command = require('@ylcli.com/command');

class InitCommand extends Command {
  get command() {
    return 'init [name]'
  }

  get description() {
    return 'init project'
  }

  get options() {
    return [
      ['-f, --force', '是否强制更新', false]
    ]
  }

  action([name,opts]) {
    log.verbose('init', name, opts)
  }

  preAction() {
    console.log('preAction')
  }

  postAction() {
    console.log('postAction')
  }
}

function Init(instance) {
  return new InitCommand(instance);
}

module.exports = Init;
