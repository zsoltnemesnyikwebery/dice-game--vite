import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import PageHome from './pages/PageHome';
import PageGame from "./pages/PageGame";

function App() {
  return (
    <>
      <Header />
      <main className="container min-h-[calc(100vh-4.5rem)] mx-auto px-5 flex flex-col items-center justify-center">
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<PageHome />} />
              <Route path="/game" element={<PageGame />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  )
}

export default App
