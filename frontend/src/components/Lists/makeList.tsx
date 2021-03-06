import * as React from 'react';
import { Link } from 'src/components/common';
import { ElementT } from 'src/types';

type ListT = React.FC<{
  className?: string;
  delimiter?: string;
  elementClassName?: string;
  elements?: ElementT[];
  link?: boolean;
}>;

export const makeList = (urlPrefix: string): ListT => {
  const ElementList: ListT = ({
    className,
    delimiter = ', ',
    elementClassName,
    elements,
    link = false,
  }) => {
    if (!elements || elements.length === 0) return <div> </div>;

    return (
      <div className={className}>
        {elements.map((elem, i) => (
          <React.Fragment key={i}>
            {i > 0 && delimiter}
            {link ? (
              <Link className={elementClassName} href={`${urlPrefix}/${elem.id}`}>
                {elem.name}
              </Link>
            ) : (
              <span className={elementClassName}>{elem.name}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return ElementList;
};
