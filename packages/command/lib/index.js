class Command {
  constructor(instance) {
    if (!instance) {
      throw new Error("command instance must not be null!");
    }
    this.program = instance;
    const cmd = this.program.command(this.command);
    cmd.description(this.description)
    if(this.options?.length > 0) {
      this.options.forEach(option => {
        cmd.option(...option)
      })
    }
    cmd.action((name, opts) => {
        console.log("init", name, opts);
      });
  }
  get command() {
    throw new Error("command must be implements");
  }

  get description() {
    throw new Error("description must be implements");
  }

  get options() {
    return [];
  }
}

module.exports = Command;
