import * as React from 'react';

import { ViewOptionsType } from 'src/hooks';
import { ReleaseView } from 'src/types';
import { Select } from 'src/components/common/Select';

const displays: { [k in ReleaseView]: string } = {
  [ReleaseView.ARTWORK]: 'Artwork',
  [ReleaseView.ROW]: 'Row',
};

export const View: React.FC<{ viewOptions: ViewOptionsType; className?: string | undefined }> = ({
  viewOptions,
  className,
}) => {
  // prettier-ignore
  const updateView = React.useCallback(
    (e) => viewOptions.setReleaseView(e.currentTarget.value),
    [viewOptions],
  );

  return (
    <Select onChange={updateView} label="View" name="select-view" className={className}>
      {Object.values(ReleaseView).map((value) => (
        <option key={value} value={value} selected={value === viewOptions.releaseView}>
          {displays[value]}
        </option>
      ))}
    </Select>
  );
};
