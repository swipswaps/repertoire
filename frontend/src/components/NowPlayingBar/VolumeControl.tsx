import * as React from 'react';
import ReactSlider from 'react-slider';
import { Icon, IconT } from 'src/components/common';
import { VolumeContext } from 'src/contexts';

export const VolumeControl: React.FC = () => {
  const { volume, setVolume, isMuted, setIsMuted } = React.useContext(VolumeContext);

  const icon = isMuted ? 'volume-off-small' : 'volume-up-small';

  return (
    <div className="relative hidden mr-1 sm:block hover-popover">
      <div
        className="p-2 cursor-pointer hover:text-primary-400 text-primary-500"
        onClick={(): void => setIsMuted((m) => !m)}
      >
        <Icon className="w-6" icon={icon as IconT} />
      </div>
      <div className="absolute w-10 h-56 px-2 py-4 border-2 border-gray-300 rounded-lg bg-background-900 dark:border-gray-700 -top-56">
        <ReactSlider
          invert
          className="slider volume-slider"
          orientation="vertical"
          value={volume}
          onChange={(value): void => (!value ? setVolume(0) : setVolume(value as number))}
        />
      </div>
    </div>
  );
};
