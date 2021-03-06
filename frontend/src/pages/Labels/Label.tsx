import * as React from 'react';
import { CollectionReleases, Header, SectionHeader } from 'src/components';
import { BackgroundContext } from 'src/contexts';
import { useFetchCollection } from 'src/lib';

export const Label: React.FC<{ active: number }> = ({ active }) => {
  const { data } = useFetchCollection(active);
  const { setBackgroundImageId } = React.useContext(BackgroundContext);

  const collection = data?.collection || null;

  React.useEffect(() => {
    if (!collection) return;

    setBackgroundImageId(collection.imageId);
    return (): void => setBackgroundImageId(null);
  }, [collection, setBackgroundImageId]);

  if (!collection) return null;

  return (
    <div className="flex flex-col w-full">
      <Header />
      <SectionHeader className="mt-4 mb-8">{collection.name}</SectionHeader>
      <CollectionReleases active={active} />
    </div>
  );
};
