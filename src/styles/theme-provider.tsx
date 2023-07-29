import { ThemeProvider } from 'styled-components';
import { theme } from 'antd';
import React from 'react';

const baseTheme = {
  fontSizes: {
    base: '16px',
    small: '18px',
    medium: '21px',
    large: '24px',
    extraLarge: '32px',
  },
};
export default function t({ children }: React.PropsWithChildren) {
  const { token } = theme.useToken();
  return (
    <ThemeProvider theme={{ antd: token, ...baseTheme }}>
      {children}
    </ThemeProvider>
  );
}
