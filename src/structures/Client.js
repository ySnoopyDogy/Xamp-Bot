const { Client, Collection } = require('discord.js')
const EventManager = require('./EventManager')
const FileUtil = require('../Utils/FileUtil')

class CustomClient extends Client {
  constructor(options) {
    super(options)

    this.commands = new Collection();
    this.slashCommands = new Collection()
    this.aliases = new Collection();
    this.Events = new EventManager(this);
  }

  async login(token) {
    return super.login(token);
  }

  async loadCommand(command, filepath) {
    command.dir = filepath;
    this.commands.set(command.name, command);
    this.aliases.set(command.name, command.name);
    command.config.aliases.forEach(a => this.aliases.set(a, command.name));
  }

  async loadEvent(event) {
    this.Events.add(event);
  }

  loadCommands(directory) {
    return FileUtil.readDirectory(directory, this, (cmd, filepath) => {
      this.loadCommand(cmd, filepath);
    });
  }

  async loadSlash(command, filepath) {
    command.dir = filepath;
    this.slashCommands.set(command.config.name, command);
  }

  loadSlashCommands(directory) {
    return FileUtil.readDirectory(directory, this, (cmd, filepath) => {
      this.loadSlash(cmd, filepath);
    });
  }

  loadEvents(directory) {
    return FileUtil.readDirectory(directory, this, evt => {
      this.loadEvent(evt);
    });
  }
}


module.exports = CustomClient