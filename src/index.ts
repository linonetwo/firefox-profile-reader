import getProfilePath from './getProfilePath';
import historyParser from './historyParser';
import bookmarkParser from './bookmarkParser';

export async function getHistory(
  query: string,
  limit: number = 15,
  version: string = 'default'
) {
  const porfilePath = await getProfilePath(version);
  return historyParser(porfilePath, query, limit);
}

export async function getBookmark(version: string = 'default') {
  const porfilePath = await getProfilePath(version);
  return bookmarkParser(porfilePath);
}
