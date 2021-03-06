import * as React from 'react';
import { matchPath } from 'react-router';
import { useLocation } from 'react-router-dom';

import { NavLink } from './Link';

type RouteT = { path: string; exact: boolean; label: string };

const sections = [
  {
    name: null,
    routes: [
      { exact: true, label: 'Explore', path: '/' },
      { exact: false, label: 'Now Playing', path: '/playing' },
    ],
  },
  {
    name: 'Library',
    routes: [
      { exact: false, label: 'Releases', path: '/releases' },
      { exact: false, label: 'Artists', path: '/artists' },
      { exact: false, label: 'Genres', path: '/genres' },
      { exact: false, label: 'Labels', path: '/labels' },
      { exact: false, label: 'Years', path: '/years' },
    ],
  },
  {
    name: 'Collections',
    routes: [
      { exact: false, label: 'Collages', path: '/collages' },
      { exact: false, label: 'Playlists', path: '/playlists' },
    ],
  },
  { name: 'Utilities', routes: [{ exact: false, label: 'Metadata Tools', path: '/metadata' }] },
];

export const RouteList: React.FC = () => {
  const location = useLocation();

  const activeRoute = sections
    .reduce<RouteT[]>((acc, section) => acc.concat(section.routes), [])
    .find(({ path, exact }) => matchPath(location.pathname, { exact, path }))?.path;

  return (
    <div>
      {sections.map(({ name, routes }) => (
        <div key={name} className="py-3 -mx-6 md:-mx-8">
          {name && (
            <div className="px-6 pb-2 text-sm uppercase md:px-8 text-primary-400">{name}</div>
          )}
          {routes.map(({ path, label }, i) => (
            <NavLink key={i} activeRoute={activeRoute} label={label} url={path} />
          ))}
        </div>
      ))}
    </div>
  );
};
