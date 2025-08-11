import type { AppProps } from "next/app";
import { NextScript } from "next/document";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@/lib/ApolloGraphql";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <html lang="en">
      <head></head>
      <body>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
        <NextScript />
        </ApolloProvider>

      </body>
    </html>
  );
}
