import * as React from 'react';

import { PaginationType, ViewOptionsType } from 'src/hooks';

import { Icon } from 'src/components/common/Icon';
import { Order } from './Order';
import { Pagination } from 'src/components/Pagination';
import { PerPage } from './PerPage';
import { Popover } from 'src/components/common/Popover';
import { SidebarContext } from 'src/contexts';
import { Sort } from './Sort';
import { View } from './View';
import clsx from 'clsx';

export const ViewSettings: React.FC<{
  viewOptions: ViewOptionsType;
  pagination: PaginationType;
  className?: string | undefined;
  partial?: boolean;
}> = ({ viewOptions, pagination, className, partial = false }) => {
  const { openBar } = React.useContext(SidebarContext);

  const [responsiveFlex, responsiveHide] = React.useMemo(() => {
    if (openBar && partial) {
      return ['xl:flex', 'xl:hidden'];
    } else if (openBar || partial) {
      return ['lg:flex', 'lg:hidden'];
    } else {
      return ['md:flex', 'md:hidden'];
    }
  }, [openBar, partial]);

  return (
    <div className={clsx('flex', className)}>
      <Pagination pagination={pagination} />
      <div className={clsx('hidden ml-auto', responsiveFlex)}>
        <View viewOptions={viewOptions} />
        <Sort className="ml-2" viewOptions={viewOptions} />
        <Order className="ml-2" viewOptions={viewOptions} />
        <PerPage className="ml-2" pagination={pagination} />
      </div>
      <Popover click className={clsx('ml-auto cursor-pointer', responsiveHide)}>
        <button className="flex items-center">
          <div>Options</div>
          <Icon className="text-bold w-4 ml-1" icon="chevron-down-small" />
        </button>
        <div className="px-4 py-2 bg-bg-alt border-highlight border-2 rounded">
          <View viewOptions={viewOptions} />
          <Sort viewOptions={viewOptions} />
          <Order viewOptions={viewOptions} />
          <PerPage pagination={pagination} />
        </div>
      </Popover>
    </div>
  );
};