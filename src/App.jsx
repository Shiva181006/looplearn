import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AddProblem from './pages/AddProblem.jsx';
import Revision from './pages/Revision.jsx';
import Library from './pages/Library.jsx';
import Analytics from './pages/Analytics.jsx';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddProblem />} />
          <Route path="/add/:id" element={<AddProblem />} />
          <Route path="/revision" element={<Revision />} />
          <Route path="/library" element={<Library />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
