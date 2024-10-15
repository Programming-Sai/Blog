import React from 'react';
import  Content  from '@/components/content/Content';
import Footer from '@/components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';


export default function Home() {

  return(
    <div >
      <Navbar />
      <Content />
      <Footer />
    </div>
    );
}
