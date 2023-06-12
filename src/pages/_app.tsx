import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
import ThemeProvider from '@/styles/theme-provider';
import { ConfigProvider } from 'antd';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: 'rgb(224, 157, 0)',
          },
        }}
      >
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
