import * as React from 'react';

import { Request, useRequest } from './request';

export const useRequestJson = <T>(): Request<T> => {
  const request = useRequest();

  const requestJson = React.useCallback(
    async (url, opts = {}) => {
      const response = await request(url, { ...opts, contentType: 'application/json' });
      return response.json();
    },
    [request],
  );

  return requestJson;
};
