import clsx from 'clsx';
import * as React from 'react';
import { Icon, Link } from 'src/components/common';

export type ElementT = { id: number; name: string; starred: boolean; type?: string };
export type ToggleStarFactory = (elem: ElementT) => () => Promise<void>;

export const Element: React.FC<{
  element: ElementT;
  active: number | null;
  urlFactory: (arg0: number) => string;
  toggleStarFactory: ToggleStarFactory;
}> = ({ element, active, urlFactory, toggleStarFactory }) => {
  const isActive = React.useMemo(() => element.id === active, [active, element]);
  const isToggleable = React.useMemo(() => element.type !== 'SYSTEM', [element]);

  const url = React.useMemo(() => urlFactory(element.id), [element, urlFactory]);
  const toggleStar = React.useMemo(() => toggleStarFactory(element), [toggleStarFactory, element]);

  return (
    <div className="relative">
      <div className={makeStarClassName(isToggleable, element.starred)} onClick={toggleStar}>
        <Icon className="w-4" icon={element.starred ? 'star-small-filled' : 'star-small-outline'} />
      </div>
      <Link href={url}>
        <div className={makeRowClassName(isActive)}>{element.name}</div>
      </Link>
    </div>
  );
};

const makeStarClassName = (isToggleable: boolean, starred: boolean): string =>
  React.useMemo(
    () =>
      clsx(
        'absolute top-0 left-0 flex items-center h-full pl-8',
        isToggleable && 'cursor-pointer',
        starred && 'text-primary',
        isToggleable && (starred ? 'hover:text-foreground' : 'hover:text-primary'),
      ),
    [isToggleable, starred],
  );

const makeRowClassName = (isActive: boolean): string =>
  React.useMemo(
    () =>
      clsx(
        'py-1 pr-10 truncate cursor-pointer pl-14 hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-5',
        isActive && 'font-bold text-primary-alt',
      ),
    [isActive],
  );
