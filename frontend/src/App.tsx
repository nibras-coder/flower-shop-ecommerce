import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import DeliveryPortal from './pages/DeliveryPortal/DeliveryPortal';

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