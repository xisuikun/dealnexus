import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { Dashboard } from './components/Dashboard';
import { Marketplace } from './components/Marketplace';
import { DealDetail } from './components/DealDetail';
import { CreateListing } from './components/CreateListing';

export default function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/deal/:id" element={<DealDetail />} />
          <Route path="/list-deal" element={<CreateListing />} />
          <Route path="*" element={<Marketplace />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

