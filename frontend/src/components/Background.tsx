import * as React from 'react';

// TODO: Light theme-ify support this.
const backgroundStyle = {
  background:
    'linear-gradient(185deg, rgba(16, 16, 19, 0.2), rgba(16, 16, 19, 0.6), rgba(16, 16, 19, 0.7), rgba(16, 16, 19, 1), rgba(16, 16, 19, 1))',
};

export const Background: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="absolute top-0 left-0 h-0 full">
    <div className="absolute top-0 left-0 z-0 opacity-50 full">{children}</div>
    <div className="absolute top-0 left-0 max-h-screen full" style={backgroundStyle} />
  </div>
);