// @ts-check
import path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';
import fs from 'fs';

const readdirAsync = promisify(fs.readdir);
const execAsync = promisify(exec);

export default async function bookmarkParser(profileFolderPath: string) {
  const bookmarkDirPath = path.join(profileFolderPath, 'bookmarkbackups');
  const files = await readdirAsync(bookmarkDirPath);
  const latestFileName = files.sort().reverse()[0];
  const fileFullPath = path.join(bookmarkDirPath, latestFileName);
  const shellFriendlyPath = fileFullPath.replace(' ', '\\ ');
  const shellCommandToReadData = `${__dirname}/mozlz4 ${shellFriendlyPath}`;
  const result = await execAsync(shellCommandToReadData);
  // sometimes result is stdout, sometimes it's "stdout" that is stdout. Depends on nodejs runtime version
  const { stdout, stderr } = result;
  if (stderr) throw new Error(stderr);
  if (!result && !stdout) throw new Error('No result or stdout after exec');
  if (typeof stdout === 'string') {
    return JSON.parse(stdout);
  }
  if (typeof result === 'string') {
    return JSON.parse(result);
  }
  throw new Error(
    `Bad stdout type ${typeof stdout} or bad result type ${typeof result}`
  );
}
