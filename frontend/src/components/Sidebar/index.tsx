import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Icon } from 'src/components/common';
import { RouteList } from 'src/components/Routelist';
import { SidebarContext } from 'src/contexts';

export const Sidebar: React.FC = () => {
  const history = useHistory();
  const { isSidebarOpen, setSidebarOpen } = React.useContext(SidebarContext);

  const goHome = React.useCallback(() => history.push('/'), [history]);
  const toggleOpen = React.useCallback(() => setSidebarOpen((o) => !o), [setSidebarOpen]);

  if (!isSidebarOpen) return null;

  return (
    <div className="sticky top-0 flex-col flex-none hidden w-56 h-full sm:flex bg-background-alt2">
      <div className="mt-6 mb-4">
        <div className="flex items-center pl-6 pr-4">
          <div className="flex items-center pr-4 cursor-pointer" onClick={goHome}>
            <Icon className="w-8 text-primary-alt" icon="logo" />
            <div className="ml-2 font-semibold">
              <span className="text-primary-alt">reper</span>toire
            </div>
          </div>
          <Icon
            icon="hamburger"
            className="flex-none block w-6 ml-auto cursor-pointer text-primary-alt hover:text-primary"
            onClick={toggleOpen}
          />
        </div>
      </div>
      <RouteList />
    </div>
  );
};
