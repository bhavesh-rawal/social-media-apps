import React, { useEffect } from "react";
import "./styles/globle.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import TopNavbar from "./components/header/TopNavbar";
import Home from "./pages/Home";
import SignIn from "./components/auth/SignIn";
import Chat from "./components/chats/Chat";

function App() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      navigate("/home");
    }
  }, []);
  return (
    <>
      {user && (
        <TopNavbar
          Navs={[
            { id: 1, titls: "Dashboard", nav: "/home" },
            { id: 2, titls: "Chat", nav: "/chat" },
          ]}
        />
      )}
      <Routes>
        <Route path="*" element={user ? <Home /> : <SignIn />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
}

export default App;
