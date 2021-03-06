import clsx from 'clsx';
import * as React from 'react';
import { Icon } from 'src/components';
import { useAddReleaseToCollection, useDelReleaseFromCollection } from 'src/lib';
import { ReleaseT } from 'src/types';

const FAVORITES_COLLECTION_ID = 2;

export const InFavorites: React.FC<{ className?: string; release: ReleaseT }> = ({
  className,
  release,
}) => {
  const [mutateAdd] = useAddReleaseToCollection();
  const [mutateDel] = useDelReleaseFromCollection();

  const toggleFavorite = (): void => {
    if (release.inFavorites) {
      mutateDel({ variables: { collectionId: FAVORITES_COLLECTION_ID, releaseId: release.id } });
    } else {
      mutateAdd({ variables: { collectionId: FAVORITES_COLLECTION_ID, releaseId: release.id } });
    }
  };

  return (
    <Icon
      className={clsx(
        className,
        'w-8 cursor-pointer',
        release.inFavorites ? 'text-pink-500' : 'text-gray-500',
      )}
      icon="heart-medium"
      title={release.inFavorites ? 'In favorites' : 'Not in favorites'}
      onClick={toggleFavorite}
    />
  );
};
