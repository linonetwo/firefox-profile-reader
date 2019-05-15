# firefox-profile-reader

Two functions are exported

```js
export async function getHistory(
  query: string,
  limit: number = 15,
  version: string = 'default'
)

export async function getBookmark(version: string = 'default')
```

## getHistory

Example:

```js
const result = await getHistory(query, limit, version);
const resultList = result
  .split('\n')
  .map(line => line.split('|'))
  .map(([url, date, frecency, ...titleParts]) => ({
    url,
    date,
    frecency,
    title: titleParts.join('|'),
  }));
```

This uses binary from https://www.sqlite.org/download.html, currently only the one for MacOS, if you need another binary, please PR.
