import React, { useEffect } from "react";
import "../styles/antd.less";
import '../styles/globals.less';
import {DefaultSeo} from "next-seo";
import cookies from "next-cookies";
import App from "next/app";
import { useRouter } from "next/router";
import NProgress from 'nprogress';
import '../styles/nprogress.less';
import { Provider, useDispatch } from "react-redux";
import store from "../store";

const dev = process.env.NODE_ENV === 'development';

const server = dev ? 'http://localhost:3000' : 'https://thinkinary.com/';

function MyApp({ Component, pageProps, user }) {

    const router = useRouter()

    useEffect(() => {
        const handleStart = (url) => {
        // console.log(`Loading: ${url}`)
            NProgress.start()
        }
        
        const handleStop = () => {
            NProgress.done()
        }

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleStop)
        router.events.on('routeChangeError', handleStop)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleStop)
            router.events.off('routeChangeError', handleStop)
        }
    }, [router]);

    const props = {...pageProps, user};

    return (
      <Provider store={store}>
          <>
          <DefaultSeo
              openGraph={{
                  type: 'website',
                  locale: 'en_GB',
                  url: 'https://www.thinkinary.com/',
                  site_name: 'Thinkinary',
              }}
              twitter={{
                  handle: '@thinkinary',
                  site: '@thinkinary',
                  cardType: 'summary_large_image',
              }}
          />
          <Component {...props} />
          </>
      </Provider>
  )
}

MyApp.getInitialProps = async (appContext) => {
    const { ctx } = appContext;
    // Calls `getInitialProps` and fills `appProps.pageProps`
    let error;
    const appProps = await App.getInitialProps(appContext);
    console.log(ctx.pathname);

    const { authToken } = cookies(ctx);
    // If token exists run Firebase validation on server side before rendering.
    if (authToken) {
        try {
            const headers = {
                'Context-Type': 'application/json',
                Authorization: JSON.stringify({ token: authToken }),
            };
            const result = await fetch(`${server}/api/validate`, { headers }).then((res) => res.json());
            return { ...result, ...appProps };
        } catch (e) {
        }
    }
    return { ...appProps };
};

export default MyApp;
