import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import DeliveryPortal from './pages/DeliveryPortal/DeliveryPortal';

function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center font-sans bg-linear-to-br from-background to-secondary/20 relative overflow-hidden">
      
      {/* Decorative background blur element */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      
      {/* Glassmorphism Card */}
      <div className="relative bg-white/40 backdrop-blur-md p-8 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border border-white/50 max-w-md text-center z-10">
        <h1 className="text-3xl font-bold text-primary mb-4 font-serif">
          Flower Shop E-Commerce
        </h1>
        <p className="text-gray-700 mb-6 font-medium">
          Tailwind v4 is configured with your vibrant theme.
        </p>
        <div className="flex flex-col gap-3">
          <Link to="/login" className="bg-primary text-white px-6 py-2 rounded-lg hover:scale-105 transition-transform duration-300 font-medium shadow-md">
            Login
          </Link>
          <Link to="/delivery" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:scale-105 transition-transform duration-300 font-medium shadow-md">
            Driver Portal
          </Link>
        </div>
      </div>
      
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/delivery" element={<DeliveryPortal />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App