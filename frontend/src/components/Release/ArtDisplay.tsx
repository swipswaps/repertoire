import clsx from 'clsx';
import * as React from 'react';
import { Link } from 'src/components/common';
import { ArtistList, GenreList } from 'src/components/Lists';
import { ArtistT, CollectionT, ReleaseT } from 'src/types';
import { secondsToLength } from 'src/util';

import { CoverArt } from './CoverArt';

const textStyle = {
  textShadow: '1px 1px black',
  background:
    'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7))',
};

export const ArtRelease: React.FC<{ release: ReleaseT; className?: string }> = ({
  release,
  className,
}) => {
  const runtime = React.useMemo(() => secondsToLength(release.runtime), [release]);

  return (
    <Link href={`/releases/${release.id}`}>
      <div className={clsx(className, 'relative h-0 pb-full text-white')}>
        <CoverArt thumbnail className="absolute full object-cover rounded-lg" release={release} />
        <div className="two-sided rounded-lg full absolute z-10" style={textStyle}>
          <div className="front flex flex-col full justify-end overflow-hidden">
            <div className="p-4 overflow-hidden">
              <div className="truncate font-medium text-lg" title={release.title}>
                {release.title}
              </div>
              <ArtistList
                className="truncate opacity-80 mt-2"
                elements={release.artists as ArtistT[]}
              />
            </div>
          </div>
          <div className="back relative full">
            <div className="absolute rounded-lg top-0 left-0 full bg-black bg-opacity-75" />
            <div className="absolute top-0 left-0 full z-10 p-4 flex flex-col justify-center items-center text-md">
              {release.releaseYear ? <div className="py-1">{release.releaseYear}</div> : null}
              <div className="py-1">
                {release.numTracks} Track{release.numTracks !== 1 && 's'} / {runtime}
              </div>
              {(release.genres as CollectionT[]).length !== 0 ? (
                <GenreList className="text-center truncate-2 mt-4" elements={release.genres} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
