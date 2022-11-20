import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth, Chat, NotFound } from "./pages";
import './App.css'

function App() {
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
