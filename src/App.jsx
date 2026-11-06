import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './views/containers/LoginPage';
import OrdersPage from './views/containers/OrdersPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
