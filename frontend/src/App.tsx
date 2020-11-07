import * as React from 'react';

import { AuthorizationContext } from 'src/contexts';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from 'src/components/Footer';
import { GlobalContexts, SidebarContext } from 'src/contexts';
import { Header } from 'src/components/Header';
import { Login } from 'src/pages';
import { Routes } from 'src/Routes';
import { Sidebar } from 'src/components/Sidebar';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalContexts>
        <Body />
      </GlobalContexts>
    </BrowserRouter>
  );
};

const Body: React.FC = () => {
  const { token } = React.useContext(AuthorizationContext);
  const { openBar } = React.useContext(SidebarContext);

  return (
    <div className="app w-full min-h-screen flex flex-col">
      {!token ? (
        <Login className="flex-1" />
      ) : (
        <>
          <div className="flex-1 flex">
            <Sidebar />
            <div style={{ width: openBar ? 'calc(100% - 14rem)' : '100%' }}>
              <Header />
              <Routes />
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
