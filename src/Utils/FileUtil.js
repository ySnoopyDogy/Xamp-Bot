const fs = require('node:fs');
const path = require('node:path');

class FileUtil {
  static filename(filepath) {
    return path.parse(filepath).name;
  }

  static async readDirectory(directory, client, callback) {
    return Promise.all(
      FileUtil.readdirRecursive(directory).map(async filepath => {
        const fullpath = path.resolve(filepath);
        const Module = (await import(fullpath)).default;
        callback(new Module(client), filepath);
      })
    );
  }

  static readdirRecursive(directory) {
    return fs.readdirSync(directory).reduce((p, file) => {
      const filepath = path.join(directory, file);
      if (fs.statSync(filepath).isDirectory()) {
        return [...p, ...FileUtil.readdirRecursive(filepath)];
      }
      return [...p, filepath];
    }, []);
  }
}

module.exports = FileUtil