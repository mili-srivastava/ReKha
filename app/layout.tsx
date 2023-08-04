import Head from "next/head";
import "./globals.css";

export const metadata = {
  title: "ReKha",
  description: "a web app for managing expenses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        {/* meta data */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </Head>

      <body>{children}</body>
    </html>
  );
}
