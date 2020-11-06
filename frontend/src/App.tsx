import * as React from 'react';

import { AuthorizationContext } from 'src/contexts';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from 'src/components/Footer';
import { GlobalContexts } from 'src/contexts';
import { Header } from 'src/components/Header';
import { Login } from 'src/pages';
import { Routes } from 'src/Routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalContexts>
        <div className="app w-full min-h-screen flex flex-col">
          <Body />
        </div>
      </GlobalContexts>
    </BrowserRouter>
  );
};

const Body: React.FC = () => {
  const { token } = React.useContext(AuthorizationContext);

  if (!token) {
    return <Login className="flex-1" />;
  } else {
    return (
      <>
        <Header />
        <Routes className="flex flex-col flex-1 mt-8 pb-16" />
        <Footer />
      </>
    );
  }
};

export default App;
