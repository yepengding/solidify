import type {AppProps} from 'next/app'
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider, EmotionCache} from '@emotion/react';
import createEmotionCache from "@/pages/createEmotionCache";
import Head from "next/head";

import {Provider} from 'react-redux'
import store from '@/core/store'
import theme from "@/pages/theme";


const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
    const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;

    return (
        <Provider store={store}>
            <CacheProvider value={emotionCache}>
                <Head>
                    <meta name="viewport" content="initial-scale=1, width=device-width"/>
                </Head>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Component {...pageProps} />
                </ThemeProvider>
            </CacheProvider>
        </Provider>
    )
}
