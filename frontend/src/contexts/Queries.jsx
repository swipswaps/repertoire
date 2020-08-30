import React, { useContext, useEffect, useState } from 'react';

import Fuse from 'fuse.js';
import { fetchQueries } from 'requests';
import { fuseOptions } from 'common/fuse';
import { submitQuery } from 'requests';
import { AuthenticationContext } from './Authentication';

export const QueriesContext = React.createContext({
  queries: [],
  setQueries: () => {},
  saveQuery: () => {},
  fuse: null,
  fetched: false,
});

export const QueriesContextProvider = ({ children }) => {
  const [queries, setQueries] = useState([]);
  const [fetched, setFetched] = useState(false);
  const fuse = new Fuse(queries, { ...fuseOptions, keys: ['name'] });

  const { token } = useContext(AuthenticationContext);

  useEffect(() => fuse.setCollection(queries), [fuse, queries]);

  useEffect(() => {
    (async () => {
      if (token) {
        setQueries(await fetchQueries(token));
        setFetched(true);
      }
    })();
  }, [token]);

  const saveQuery = (query, name) => {
    const submittedQuery = submitQuery(query, name);
    setQueries([submittedQuery, ...queries]);
  };

  const value = { queries, setQueries, saveQuery, fuse, fetched };

  return <QueriesContext.Provider value={value}>{children}</QueriesContext.Provider>;
};
