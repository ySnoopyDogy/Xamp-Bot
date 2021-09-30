
class Command {
  constructor(client, name, options) {
    this.client = client;
    this.name = name;
    this.config = {
      category: options.category || 'dev',
      aliases: options.aliases || [],
      UserPermission: options.UserPermission ?? [],
      ClientPermissions: options.ClientPermissions ?? [],
    };
  }

  run() { }
}

module.exports = Command