import clsx from 'clsx';
import * as React from 'react';
import { SectionHeader } from 'src/components/common';
import { PlayQueueContext } from 'src/contexts';
import { TrackT } from 'src/types';
import { stringNumberCompare } from 'src/util';

import { Track } from './Track';
import { checkMatchingTracklists } from './util';

type Discs = { [dn in string]: TrackT[] };

export const Disclist: React.FC<{ className?: string; tracks: TrackT[] }> = ({
  className,
  tracks,
}) => {
  const { playQueue, setPlayQueue, curIndex, setCurIndex } = React.useContext(PlayQueueContext);

  const discs = React.useMemo(() => sortTracksIntoDiscs(tracks), [tracks]);
  const multiDisc = Object.keys(discs).length !== 1;

  const sortedTracklist = React.useMemo(() => sortDiscsIntoTracklist(discs), [discs]);

  // Check to see if the current track list matches up with the play queue--if
  // it does, we are currently playing this Disclist.
  const areTrackListsMatching = React.useMemo(
    () => checkMatchingTracklists(playQueue, sortedTracklist),
    [playQueue, sortedTracklist],
  );

  const trackOnClick = (index: number): void => {
    if (!areTrackListsMatching) {
      setPlayQueue(sortedTracklist);
    }

    setCurIndex(index);
  };

  let trackIndex = -1;

  return (
    <div className={clsx(className, 'pb-8')}>
      {Object.entries(discs).map(([discNumber, discTracks], i) => (
        <React.Fragment key={discNumber}>
          {multiDisc && (
            <SectionHeader className={clsx('text-foreground-300', i > 0 ? 'my-4' : 'mb-4')}>
              Disc {discNumber}
            </SectionHeader>
          )}
          {discTracks.map((track, trackNumber) => {
            trackIndex++;
            return (
              <Track
                key={trackIndex}
                active={areTrackListsMatching && curIndex === trackIndex}
                index={trackIndex}
                track={track}
                trackNumber={trackNumber + 1}
                onClick={trackOnClick}
              />
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

const sortTracksIntoDiscs = (tracks: TrackT[]): Discs => {
  const discs = tracks.reduce<Discs>((acc, track) => {
    const discNumber = track.discNumber || '1';

    acc[discNumber] = acc[discNumber] ?? []; // eslint-disable-line no-param-reassign
    acc[discNumber].push(track);

    return acc;
  }, {});

  Object.keys(discs).forEach((dn) => {
    discs[dn].sort((a, b) => stringNumberCompare(a.trackNumber, b.trackNumber));
  });

  return discs;
};

const sortDiscsIntoTracklist = (discs: Discs): TrackT[] => {
  const discKeys = Object.keys(discs);
  discKeys.sort(stringNumberCompare);

  return discKeys.reduce<TrackT[]>((acc, disc) => {
    acc.push(...discs[disc]);
    return acc;
  }, []);
};
