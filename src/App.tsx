import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TopNavbar from './components/Header/TopNav';
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/Style/Index.css'
import Image_Post_Form from './components/Form/Image_Post_Form';
import Videos_Post_Form from './components/Form/Videos_Post_Form';
import AccessToken_Genrate from './components/Form/AccessToken_Genrate';
function App() {
  return (
    <>
      <TopNavbar Navs={[{ titls: "Genrate Access Token", nav: "/" }, { titls: "Post Images", nav: "/postImage" }, { titls: "Post Videos", nav: "postVideos" }]} />
      <Routes>
        <Route path='/' element={<AccessToken_Genrate />} />
        <Route path='/postImage' element={<Image_Post_Form />} />
        <Route path='/postVideos' element={<Videos_Post_Form />} />
      </Routes>

    </>
  );
}

export default App;
