import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/error404.css';

export default function error404() {
  return (
    <>
      <Header />
      <div className="error404" />
      <Footer />
    </>
  );
}
