import * as React from 'react';

import { Chooser, ElementT } from 'src/components/Chooser';
import { fetchCollections, useMutateCollection } from 'src/lib';
import { CollectionType } from 'src/types';

const urlFactory = (id: number): string => `/genres/${id}`;

export const CollectionChooser: React.FC<{
  collectionType: CollectionType;
  active: number | null;
  className?: string;
}> = ({ collectionType, active, className }) => {
  const { status, data } = fetchCollections(collectionType);
  const [mutateCollection] = useMutateCollection();

  const results = React.useMemo(() => {
    if (!data || status !== 'success') return null;

    const results = data.collections.results;
    results.sort((a, b) => a.name.localeCompare(b.name));
    return results;
  }, [data, status]);

  const toggleStarFactory = React.useCallback(
    ({ id, starred }: ElementT) => {
      return async (): Promise<void> => {
        mutateCollection({ id, starred: !starred });
      };
    },
    [mutateCollection],
  );

  if (!results) return null;

  return (
    <Chooser
      className={className}
      results={results}
      active={active}
      urlFactory={urlFactory}
      toggleStarFactory={toggleStarFactory}
    />
  );
};