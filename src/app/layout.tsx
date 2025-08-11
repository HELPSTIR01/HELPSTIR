"use client";
import "./globals.css";
import { ApolloWrapper } from "@/bootstrap/ApolloGraphqlSSR";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { useServerInsertedHTML } from "next/navigation";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sheet = new ServerStyleSheet();
  useServerInsertedHTML(() => (
    <style dangerouslySetInnerHTML={{ __html: sheet.getStyleTags() }} />
  ));
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="light only" />
      </head>
      <body>
        <ApolloWrapper>
          <StyleSheetManager sheet={sheet.instance}>
            {children}
          </StyleSheetManager>
        </ApolloWrapper>
      </body>
      <GoogleAnalytics gaId="G-B4T5P812XT" />
    </html>
  );
}
