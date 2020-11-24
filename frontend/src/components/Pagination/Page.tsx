import * as React from 'react';

import clsx from 'clsx';

export const Page: React.FC<{
  page: number;
  curPage: number;
  setCurPage: (arg0: number) => void;
  className?: string;
}> = ({ page, curPage, setCurPage, className }) => {
  const onClick = React.useCallback(() => setCurPage(page), [page, setCurPage]);

  // prettier-ignore
  const theme = React.useMemo(
    () => (page === curPage ? 'text-primary' : 'text-black dark:text-white'),
    [page, curPage]
  );

  return (
    <button className={clsx(className, theme, 'p-1 bg-transparent rounded-none')} onClick={onClick}>
      {page}
    </button>
  );
};
