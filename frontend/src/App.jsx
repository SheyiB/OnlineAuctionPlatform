import { Routes, Route } from 'react-router-dom';
import Auction from './pages/auction';
import AuctionerDashboard from './pages/auctioneerDashboard';
import Login from './pages/login';
import Market from './pages/market';
import Signup from './pages/signup';
import EditMarket from './pages/EditMarket'

const App = () => {
 return (
    <>
       <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/market/:marketId" element={<Market />} />
          <Route path="/dashboard" element={<AuctionerDashboard />} />
          <Route path="/auction/:auctionId" element={<Auction />} />
          <Route path="/dashboard/:marketId" element={<EditMarket/>} />
       </Routes>
    </>
 );
};

export default App;