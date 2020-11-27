import * as React from 'react';
import { Icon } from 'src/components';
import { PlayQueueContext } from 'src/contexts';
import { SetValue } from 'src/types';

export const PlayButtons: React.FC<{
  isPlaying: boolean;
  setIsPlaying: SetValue<boolean>;
  curTime: number;
  seek: SetValue<number>;
}> = ({ isPlaying, setIsPlaying, curTime, seek }) => {
  const { playQueue, setCurIndex } = React.useContext(PlayQueueContext);

  const togglePlay = React.useCallback(() => setIsPlaying((p: boolean) => !p), [setIsPlaying]);

  const fastForward = React.useCallback(
    () => setCurIndex((idx) => (idx !== null && idx !== playQueue.length - 1 ? idx + 1 : null)),
    [setIsPlaying],
  );

  const rewind = React.useCallback(() => {
    if (isPlaying && curTime > 10) {
      seek(0);
    } else {
      setCurIndex((idx) => (idx !== null && idx !== 0 ? idx - 1 : null));
    }
  }, [curTime, setIsPlaying]);

  return (
    <div className="flex items-center justify-center flex-none mx-4 sm:mx-8 text-primary">
      <Icon
        className="mr-1 cursor-pointer w-9 hover:text-primary-alt3"
        icon="rewind-small"
        onClick={rewind}
      />
      <Icon
        className="w-12 mr-1 cursor-pointer hover:text-primary-alt3"
        icon={isPlaying ? 'pause-small' : 'play-small'}
        onClick={togglePlay}
      />
      <Icon
        className="cursor-pointer w-9 hover:text-primary-alt3"
        icon="fast-forward-small"
        onClick={fastForward}
      />
    </div>
  );
};