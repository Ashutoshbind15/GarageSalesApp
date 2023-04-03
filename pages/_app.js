import Layout from "../components/layout/Layout";
import Navbar from "../components/layout/Navbar";
import CartContextProvider from "../context/CartContext";
import "../styles/globals.css";

import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <CartContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
