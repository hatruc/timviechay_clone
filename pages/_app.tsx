/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/no-css-tags */
import Head from "next/head";
import { useState } from "react";
import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { authorization } from "./api/base-api";
import ErrorBoundary from "@/components/ErrorBoundary";
import QueryProviders from "@/components/common/query-provider/provider";
import { DataContainerContext } from "@/utils/context/useDataContext";
import Script from "next/script";
import { ReduxProviders } from "@/commons/redux-provider/provider";
import { NTD_UV_ContextProvider } from "@/components/context/ntd_uv_context";

export default function MyApp({ Component, pageProps }: any) {
  const [isLogin, setIsLogin] = useState(false);
  const [type, setType] = useState(1);
  authorization({ isLogin, type });
  console.warn = () => { };
  return (
    <>
      <ErrorBoundary>
        <Head>
          <script src="/cv365/js/cv_page.js?v=217"></script>
          <script src="https://code.jquery.com/jquery-3.6.0.min.js" defer></script>
          <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" defer></script>
          <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js" defer></script>
          <link rel="icon" href="/icon.png"/>
          <meta name="robots" content="noindex,nofollow" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <link
          href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css"
          rel="stylesheet"
        />
        <link href="/override.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <ReduxProviders>
          <DataContainerContext>
            <NTD_UV_ContextProvider>
              <QueryProviders>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </QueryProviders>
            </NTD_UV_ContextProvider>
          </DataContainerContext>
        </ReduxProviders>
      </ErrorBoundary>
    </>
  );
}
