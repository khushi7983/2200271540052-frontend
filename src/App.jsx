import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import URLShortener from './components/URLShortener';
import URLStatistics from './components/URLStatistics';
import RedirectPage from './components/RedirectPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/statistics" element={<URLStatistics />} />
        <Route path="/" element={<URLShortener />} />
        <Route path="/s/:shortcode" element={<RedirectPage />} />
      </Routes>
    </Router>
  );
}

export default App;