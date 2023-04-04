import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="bg-white text-black">
      <Navbar />
      <main className="px-12 min-h-screen py-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
