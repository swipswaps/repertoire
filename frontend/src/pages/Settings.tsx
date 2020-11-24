import * as React from 'react';
import { ThemeT, ThemeContext } from 'src/contexts';
import { Header } from 'src/components/Header';
import { SectionHeader } from 'src/components/common/SectionHeader';

export const Settings: React.FC = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  const toggleTheme = React.useCallback(
    () => setTheme((theme: ThemeT) => (theme === 'light' ? 'dark' : 'light')),
    [setTheme],
  );

  return (
    <>
      <Header searchbar={false} />
      <div className="px-8">
        <SectionHeader className="mt-4 mb-8">Settings</SectionHeader>
        <div>
          Toggle theme: <button onClick={toggleTheme}>{theme}</button>
        </div>
      </div>
    </>
  );
};
