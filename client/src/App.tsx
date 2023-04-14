import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotFound } from "./pages";
import "./App.css";
import { Chat, Auth } from "./pages";
import { useSelector } from "react-redux";

export const App = () => {
  const { isAuth } = useSelector((state: any) => state.user);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={!isAuth ? <Auth /> : <Chat />} />
        <Route path="/chat" element={!isAuth ? <Auth /> : <Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
