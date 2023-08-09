import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
import ThemeProvider from '@/styles/theme-provider';
import { ConfigProvider } from 'antd';
import { Analytics } from '@vercel/analytics/react';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as gtag from '../utils/gtag';
import Script from 'next/script';
import '@/styles/globals.css';
const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  console.log(GA_MEASUREMENT_ID);
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: 'rgb(224, 157, 0)',
              },
            }}
          >
            <ThemeProvider>
              <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              ></Script>
              <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `,
                }}
              />
              <Component {...pageProps} />
            </ThemeProvider>
          </ConfigProvider>
        </QueryClientProvider>
      </SessionProvider>
      <Analytics></Analytics>
    </>
  );
}
