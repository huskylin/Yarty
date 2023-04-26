import { ThemeProvider } from 'styled-components';
import { theme } from 'antd';
import React from 'react';

export default function t({ children }: React.PropsWithChildren) {
  const { token } = theme.useToken();
  return (
    <ThemeProvider theme={{ antd: token, base: { color: 'mediumseagreen' } }}>
      {children}
    </ThemeProvider>
  );
}
