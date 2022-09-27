import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          src='https://kit.fontawesome.com/67a23910f1.js'
          crossOrigin='anonymous'
        />
      </Head>
      <body className='bg-[#F5F5F5]'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
