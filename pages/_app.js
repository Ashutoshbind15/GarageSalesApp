import Navbar from "../components/layout/Navbar";
import CartContextProvider from "../context/CartContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <CartContextProvider>
      <Navbar />
      <Component {...pageProps} />
    </CartContextProvider>
  );
}

export default MyApp;
