import * as React from 'react';

import clsx from 'clsx';

export const SectionHeader: React.FC<{
  children: React.ReactNode;
  className?: string | undefined;
}> = ({ children, className }) => {
  return <div className={clsx(className, 'font-semibold text-3xl')}>{children}</div>;
};
