import React from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Box, ChakraProvider } from '@chakra-ui/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { appTheme } from 'theme'
import { Spacer } from 'components'
import { ApolloProvider } from '@apollo/client'
import { client } from 'client'
import '../styles.css'

type AppPropsWithLayout = AppProps & {
  Component: CpxPageWithLayout
}

const CpxApp = ({ Component: Page, pageProps }: AppPropsWithLayout) => {
  const Layout = Page.Layout ?? React.Fragment

  return (
    <div>
      <HeadTags />
      <ApolloProvider client={client}>
        <ChakraProvider theme={appTheme}>
          <DndProvider backend={HTML5Backend}>
            <Box sx={{ height: '100%', minHeight: '100vh' }}>
              <Layout>
                <Page {...pageProps} />
              </Layout>
              <Spacer height={10} />
            </Box>
          </DndProvider>
        </ChakraProvider>
      </ApolloProvider>
    </div>
  )
}

export default CpxApp

const HeadTags = () => (
  <Head>
    <title>CPX</title>
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
    <link
      rel="apple-touch-icon"
      sizes="114x114"
      href="/apple-icon-114x114.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="120x120"
      href="/apple-icon-120x120.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="144x144"
      href="/apple-icon-144x144.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="152x152"
      href="/apple-icon-152x152.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/apple-icon-180x180.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="192x192"
      href="/android-icon-192x192.png"
    />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/manifest.json" />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
    <meta name="theme-color" content="#ffffff" />
  </Head>
)
