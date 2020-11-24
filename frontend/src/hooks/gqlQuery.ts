import * as React from 'react';

import { GraphQLError, RequestError } from 'src/types';
import { QueryKey, QueryResult, useQuery } from 'react-query';

import { AuthorizationContext } from 'src/contexts';
import { useToasts } from 'react-toast-notifications';

type Options<V> = { variables?: V; authorization?: string };
type ErrorType = { type: string; message: string };
type RawGQLQuery<T, V> = (query: string, variables?: V) => Promise<T>;

export const useGQLQuery = <T, V = undefined>(
  cacheKey: QueryKey,
  query: string,
  { variables }: Options<V> = {},
): QueryResult<T, RequestError<GraphQLError>> => {
  const { addToast } = useToasts();
  const { loggedIn } = React.useContext(AuthorizationContext);
  const rawQuery = useRawGQLQuery<T, V>();

  const handler = React.useCallback(async () => {
    if (!loggedIn) {
      throw new RequestError('Not logged in.');
    }

    try {
      return await rawQuery(query, variables);
    } catch (e) {
      e.errors.forEach(({ message }: ErrorType) => {
        addToast(message, { appearance: 'error' });
      });

      throw e;
    }
  }, [variables, addToast, loggedIn, rawQuery]);

  const queryKey = React.useMemo(() => [cacheKey, variables], [cacheKey, variables]);

  return useQuery<T, RequestError<GraphQLError>>(queryKey, handler);
};

export const useRawGQLQuery = <T, V = undefined>(): RawGQLQuery<T, V> => {
  const { csrf } = React.useContext(AuthorizationContext);
  const { loggedIn, setLoggedIn } = React.useContext(AuthorizationContext);

  const rawGqlQuery = React.useCallback(
    async (query: string, variables?: V): Promise<T> => {
      if (!loggedIn) {
        throw new RequestError('Not logged in.');
      }

      const response = await fetch('/graphql', {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify({
          query: query,
          variables: variables,
        }),
        headers: new Headers({
          'X-CSRF-Token': csrf ?? '',
          'Content-Type': 'application/json',
        }),
      });

      if (response.status == 401) {
        setLoggedIn(false);
        throw new RequestError('Failed to authenticate.');
      }

      const gqlData = await response.json();

      if (gqlData.errors) {
        throw new RequestError<GraphQLError>('GraphQL Error', gqlData.errors);
      }

      return gqlData.data;
    },
    [csrf, loggedIn, setLoggedIn],
  );

  return rawGqlQuery;
};
