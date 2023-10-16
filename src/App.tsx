import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TopNavbar from './components/Header/TopNavbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/App.css'
import Facebook from './Pages/Facebook/Facebook';
import Instagram from './Pages/Instagram/Instagram';
import ChatBot from './Pages/Chat-Bot/ChatBot';
function App() {
  return (
    <>
      <TopNavbar Navs={[{ titls: "Facebook & Instagram", nav: "/" }, { titls: "Chat Bot", nav: "/ChatBot" }]} />
      <Routes>
        <Route path='/' element={<Facebook />} />
        {/* <Route path='/Instagram' element={<Instagram />} /> */}
        <Route path='/ChatBot' element={<ChatBot />} />
      </Routes>

    </>
  );
}

export default App;
