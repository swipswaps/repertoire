import * as React from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { Icon } from 'src/components/common/Icon';
import { NavLink } from './Link';
import { SidebarContext } from 'src/contexts';
import { matchPath } from 'react-router';

const libraryRoutes = [
  { path: '/releases', exact: false, label: 'Releases' },
  { path: '/artists', exact: false, label: 'Artists' },
  { path: '/genres', exact: false, label: 'Genres' },
  { path: '/labels', exact: false, label: 'Labels' },
];

const collectionRoutes = [
  { path: '/playlists', exact: false, label: 'Playlists' },
  { path: '/collages', exact: false, label: 'Collages' },
];

const adminRoutes = [{ path: '/metadata', exact: false, label: 'Metadata' }];

const sections = [
  { name: 'Library', routes: libraryRoutes },
  { name: 'Collections', routes: collectionRoutes },
  { name: 'Admin', routes: adminRoutes },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const { openBar, setOpenBar } = React.useContext(SidebarContext);

  const activeRoute = React.useMemo(() => {
    const active = libraryRoutes
      .concat(collectionRoutes)
      .concat(adminRoutes)
      .find(({ path, exact }) => matchPath(location.pathname, { path, exact }));

    return active ? active.path : null;
  }, [location]);

  const goHome = React.useCallback(() => history.push('/'), [history]);
  const toggleOpen = React.useCallback(() => setOpenBar((o) => !o), [setOpenBar]);

  if (!openBar) return null;

  return (
    <div
      className="flex-none sticky bg-bg-alt top-0 flex flex-col w-56"
      style={{ height: 'calc(100vh - 4rem)' }}
    >
      <div className="my-6">
        <div className="flex items-center pl-6 pr-4 cursor-pointer">
          <div className="flex items-center flex-1" onClick={goHome}>
            <Icon className="text-bold w-8" icon="logo" />
            <div className="font-semibold ml-2">
              <span className="text-bold">reper</span>toire
            </div>
          </div>
          <Icon
            icon="hamburger"
            className="flex-none ml-auto w-6 pointer-cursor"
            onClick={toggleOpen}
          />
        </div>
      </div>
      {sections.map(({ name, routes }) => (
        <div key={name} className="my-6">
          <div className="mb-4 px-8 text-bold text-sm uppercase">{name}</div>
          {routes.map(({ path, label }, i) => (
            <NavLink
              key={i}
              className="py-2 px-8"
              url={path}
              activeRoute={activeRoute}
              label={label}
            />
          ))}
        </div>
      ))}
    </div>
  );
};