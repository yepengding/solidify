import * as React from 'react';
import Document, {DocumentContext, DocumentProps, Head, Html, Main, NextScript} from 'next/document'
import theme, {roboto} from '@/pages/theme';
import createEmotionCache from '@/pages/createEmotionCache';
import {MyAppProps} from './_app';
import {AppType} from "next/app";
import createEmotionServer from "@emotion/server/create-instance";


interface MyDocumentProps extends DocumentProps {
    emotionStyleTags: JSX.Element[];
}

export default function MyDocument({emotionStyleTags}: MyDocumentProps) {
    return (
        <Html lang="en" className={roboto.className}>
            <Head>
                <meta name="theme-color" content={theme.palette.primary.main}/>
                <link rel="shortcut icon" href="/favicon.ico"/>
                <meta name="emotion-insertion-point" content=""/>
                {emotionStyleTags}
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {

    const originalRenderPage = ctx.renderPage;

    const cache = createEmotionCache();
    const {extractCriticalToChunks} = createEmotionServer(cache);

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App: React.ComponentType<React.ComponentProps<AppType> & MyAppProps>) =>
                function EnhanceApp(props) {
                    return <App emotionCache={cache} {...props} />;
                },
        });

    const initialProps = await Document.getInitialProps(ctx);

    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{__html: style.css}}
        />
    ));

    return {
        ...initialProps,
        emotionStyleTags,
    };
};
