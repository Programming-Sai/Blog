import React from "react";
import Content from "@/components/content/Content";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";

export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  return (
    <div>
      <Navbar />
      <Content page={page} />
      <Footer />
    </div>
  );
}
