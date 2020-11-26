import * as React from 'react';
import { ArtistList, GenreList, LabelList, Link, SectionHeader } from 'src/components';
import { ArtistT, CollectionT, ReleaseT } from 'src/types';
import { formatReleaseDate } from 'src/util';

export const Info: React.FC<{ release: ReleaseT }> = ({ release }) => {
  const whenReleased = React.useMemo(() => formatReleaseDate(release), [release]);

  const genreLength = React.useMemo(() => (release.genres as CollectionT[]).length, [release]);
  const labelLength = React.useMemo(() => (release.labels as CollectionT[]).length, [release]);

  return (
    <div className="flex flex-col">
      <SectionHeader className="mb-4 truncate-2">{release.title}</SectionHeader>
      <div className="mb-2 text-lg truncate-2">
        {(release.artists as ArtistT[]).length === 0 ? (
          <Link href="/artists/1">Unknown Artist</Link>
        ) : (
          <>
            <span>By: </span>
            <ArtistList
              className="inline"
              elementClassName="text-primary-alt3"
              elements={release.artists}
              link
            />
          </>
        )}
      </div>
      <div className="mb-1 text-gray-800 text-md dark:text-gray-300">{whenReleased}</div>
      <div className="mb-1 text-gray-800 text-md truncate-2 dark:text-gray-300">
        {labelLength === 0 ? (
          <span>No Label</span>
        ) : (
          <>
            <span>Label{labelLength > 1 ? 's' : ''}: </span>
            <LabelList
              className="inline"
              elementClassName="text-primary-alt3"
              elements={release.labels}
              link
            />
          </>
        )}
      </div>
      <div className="text-gray-800 text-md truncate-2 dark:text-gray-300">
        {genreLength !== 0 && (
          <>
            <GenreList
              className="my-2"
              elementClassName="bg-primary-alt text-foreground px-2 py-1 mr-1 rounded leading-9"
              elements={release.genres}
              delimiter=" "
              link
            />
          </>
        )}
      </div>
    </div>
  );
};
