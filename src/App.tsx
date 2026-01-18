import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageHome from './pages/PageHome';
import PageGame from "./pages/PageGame";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<PageHome />} />
          <Route path="/game" element={<PageGame />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
