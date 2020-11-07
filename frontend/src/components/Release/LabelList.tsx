import * as React from 'react';

import { CollectionT } from 'src/types';
import { Link } from 'src/components/common/Link';

export const LabelList: React.FC<{
  labels: CollectionT[] | undefined;
  className?: string | undefined;
  prefix?: string;
}> = ({ labels, className, prefix = '' }) => {
  if (!labels || labels.length === 0) return <div>&nbsp;</div>;

  return (
    <div className={className}>
      {prefix && <span>{prefix} </span>}
      {labels.map((lbl, i) => (
        <React.Fragment key={lbl.id}>
          {i > 0 && <>, </>}
          <Link href={`/labels/${lbl.id}`}>{lbl.name}</Link>
        </React.Fragment>
      ))}
    </div>
  );
};