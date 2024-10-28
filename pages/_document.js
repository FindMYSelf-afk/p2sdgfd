import { Html, Head, Main, NextScript } from "next/document";
import { SpeedInsights } from '@vercel/speed-insights/next';
export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <link rel="icon" href="/favicon.ico" sizes="any" /> 
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
<SpeedInsights/>
      </body>
    </Html>
  );
}
