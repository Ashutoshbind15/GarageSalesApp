import Navbar from "../components/layout/Navbar";
import CartContextProvider from "../context/CartContext";
import "../styles/globals.css";

import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <CartContextProvider>
        <Navbar />
        <Component {...pageProps} />
      </CartContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
