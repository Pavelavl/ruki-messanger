import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotFound } from "./pages";
import './App.css'
import { Chat, Auth } from "./pages";

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

export default App;
