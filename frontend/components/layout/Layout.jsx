import React from 'react';
import Header from '@/components/homePage/Header';
import Footer from '@/components/homePage/Footer';
import Head from 'next/head';
import Cart from '../shop/Cart';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>BCP Auto</title>
        <meta name="description" content="Hieronder vindt u een selectie van onze gebruikte auto's van topkwaliteit. Wij zijn een betrouwbare autodealer die al jarenlang hoogwaardige tweedehands auto's verkoopt in Nederland. Bekijk ons aanbod en vind de perfecte gebruikte auto voor u!" />
      </Head>
      <Header />
        <main>
          {children}
        </main>
      <Footer />
    </>
  )
}
