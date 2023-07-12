import { Routes, Route } from 'react-router-dom';
import Auction from './pages/auction';
import AuctionerDashboard from './pages/auctioneerDashboard';
import Login from './pages/login';
import Market from './pages/market';
import Signup from './pages/signup';

const App = () => {
 return (
    <>
       <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/market" element={<Market />} />
          <Route path="/dashboard" element={<AuctionerDashboard />} />
          <Route path="/auction" element={<Auction />} />
       </Routes>
    </>
 );
};

export default App;