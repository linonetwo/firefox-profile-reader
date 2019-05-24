// @ts-check
import { promisify } from 'util';
import os from 'os';
import fs from 'fs';
import path from 'path';

const readdirAsync = promisify(fs.readdir);

export default async function getProfilePath(version: string = 'default') {
  switch (os.type()) {
    case 'Windows_NT': {
      const filePath = path.join(
        os.homedir(),
        'AppData',
        'Roaming',
        'Mozilla',
        'Firefox'
      );
      return filePath;
    }
    case 'Linux': {
      const filePath = path.join(os.homedir(), '.mozilla', 'firefox');
      return filePath;
    }
    case 'Darwin':
    default: {
      const filePath = `${os.homedir()}/Library/Application Support/Firefox/Profiles`;
      const subDirs = await readdirAsync(filePath);
      const userProfileDir = subDirs.filter(
        dirName =>
          dirName.split('.')[1] === version ||
          dirName.split('.')[1] === `${version}-release`
      )[0];
      return path.join(filePath, userProfileDir);
    }
  }
}
