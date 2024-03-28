type Query = Record<string, string | string[] | boolean>;

export const getQuery = (search: URLSearchParams): Query => {
  const query: Record<string, string[]> = {};
  const searchEntries = search.entries();
  let searchEntry = searchEntries.next();

  while (!searchEntry.done) {
    const [key, value] = searchEntry.value;
    if (query[key] !== undefined) {
      query[key].push(value);
    } else {
      query[key] = [value];
    }
    searchEntry = searchEntries.next();
  }

  const queryEntries = Object.entries(query);
  const result: Query = {};
  queryEntries.forEach(([key, value]) => {
    if (Array.isArray(value)) {
      if (key === 'categories') {
        value = value[0].split(',');
        result[key] = value;
      } else {
        result[key] = value.length === 1 ? value[0] : value;
      }
    } else {
      result[key] = typeof value === 'boolean' ? !!value : value;
    }
  });

  return result;
};
