import '@/App.css';
import React from 'react';
import Header from '@/Components/Header';
import Section from '@/Components/Section';
import Map from '@/Components/Map'
import Footer from '@/Components/Footer';
import Info from '@/Components/Info';
import PerroList from '@/Components/PerroList';
import Gallery from '@/Components/Gallery';


function App() {
  return (
    <div className="App">
      <Header/>
      <Section/>
      <PerroList/>
      <Gallery/>
      <Map/>
      <Info/>
      <Footer/>
    </div>
  );
}

export default App;
