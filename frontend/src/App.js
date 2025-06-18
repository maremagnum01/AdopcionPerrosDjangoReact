import './App.css';
import React from 'react';
import Header from './Components/Header';
import Section from './Components/Section';
import Map from './Components/Map'
import Footer from './Components/Footer';
import Info from './Components/Info';
// import Nav from './Components/Nav'
import PerroList from './Components/PerroList';


function App() {
  return (
    <div className="App">
      <Header/>
      <Section/>
      {/* <Nav/> */}
      <PerroList/>
      <Map/>
      <Info/>
      <Footer/>
    </div>
  );
}

export default App;
