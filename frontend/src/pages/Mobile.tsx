import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Icon } from 'src/components/common';
import { Searchbar } from 'src/components/Header/Searchbar';
import { User } from 'src/components/Header/User';
import { RouteList } from 'src/components/Routelist';

export const Mobile: React.FC = () => {
  const history = useHistory();

  const goHome = React.useCallback(() => history.push('/'), [history]);

  return (
    <div className="flex flex-col flex-1 full">
      <div className="mt-6 mb-4">
        <div className="flex items-center pl-6 pr-8">
          <div className="flex items-center pr-4 cursor-pointer" onClick={goHome}>
            <Icon className="w-8 text-primary" icon="logo" />
            <div className="ml-2 font-semibold">
              <span className="text-primary">reper</span>toire
            </div>
          </div>
          <User className="ml-auto" />
        </div>
      </div>
      <Searchbar className="flex-none block h-16 mx-8 mb-4" shrink={false} />
      <RouteList />
    </div>
  );
};