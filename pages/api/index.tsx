import Head from "next/head";
import { Image, Text } from '@chakra-ui/core'

export default function Home(props) {
  return (
    <>
    <Head>
        <meta charSet="utf-8" />
        <title>Spacetag</title>
        <meta
          key="viewport"
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
        <meta key="theme-color" name="theme-color" content="var(--primary)" />
        <meta name="twitter:site" key="twitter:site" content="@zealigan" />
        <meta
          name="twitter:card"
          key="twitter:card"
          content="summary_large_image"
        />
        <meta
          name="og:title"
          key="og:title"
          content="Spacetag - You're it!"
        />
        <link key="favicon" rel="shortcut icon" href="/favicon.ico" />
        <meta name="og:url" key="og:url" content="https://spacetag.vercel.app" />
        <meta
          name="description"
          key="description"
          content="Spacetag - You're it!"
        />
        <meta
          name="og:description"
          key="og:description"
          content="Spacetag - You're it!"
        />
        <meta
          name="og:image"
          key="og:image"
          content="https://spacetag.vercel.app/social.png"
        />
      </Head>
      <div className="page" >
        <Image height={200} width={200} src="/logo.png" m={4} />
        <Text fontSize="2xl" m={4} textAlign="center">
          It looks like you've found the api of SpaceTag!
        </Text>
      </div>
      <style jsx>{`
        .page {
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
}
