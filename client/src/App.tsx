import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotFound } from "./pages";
import './App.css'
import Chat from "./pages/Chat/Chat";
import Auth from "./pages/Auth/Auth";
import { observer } from "mobx-react-lite";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Auth />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default observer(App);
