import * as React from 'react';
import { QueryResult, useQuery } from 'react-query';
import { API_URL } from 'src/constants';
import { useToasts } from 'react-toast-notifications';
import { AuthorizationContext } from 'src/contexts';
import { RequestError, GraphQLError } from 'src/types';

type Options<V> = { variables?: V; authorization?: string };
type ErrorType = { type: string; message: string };
type RawGQLQuery<T, V> = (query: string, options: Options<V>) => Promise<T>;
type Response<T> = { data: T; errors: GraphQLError[] };

const GQL_URL = `${API_URL}/graphql`;

export const useGQLQuery = <T, V = undefined>(
  cacheKey: string,
  query: string,
  { variables, authorization }: Options<V> = {},
): QueryResult<T, RequestError<GraphQLError>> => {
  const { addToast } = useToasts();
  const { token, setToken } = React.useContext(AuthorizationContext);
  const rawQuery = useRawGQLQuery<T, V>();

  const options = React.useMemo(
    () => ({
      variables,
      authorization: authorization ?? token ?? undefined,
    }),
    [variables, authorization, token],
  );

  const handler = React.useCallback(async () => {
    try {
      return await rawQuery(query, options);
    } catch (e) {
      e.errors.forEach(({ type, message }: ErrorType) => {
        if (type === 'NotAuthorized') {
          setToken(null);
        }

        addToast(message, { appearance: 'error' });
      });

      throw e;
    }
  }, [options, addToast, setToken, rawQuery]);

  return useQuery<T, RequestError<GraphQLError>>(cacheKey, handler);
};

export const useRawGQLQuery = <T, V = undefined>(): RawGQLQuery<T, V> => {
  const rawGqlQuery = React.useCallback(
    async (query: string, { variables, authorization }: Options<V>): Promise<T> => {
      const headers: Record<string, string> = {
        Authorization: authorization ? `Token ${authorization}` : '',
        'Content-Type': 'application/json',
      };

      const promise = await fetch(GQL_URL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          query: query,
          variables: variables,
        }),
      });

      const response = await (promise.json() as Promise<Response<T>>);

      if (response.errors) {
        throw new RequestError<GraphQLError>('GraphQL Error', response.errors);
      }

      return response.data;
    },
    [],
  );

  return rawGqlQuery;
};
