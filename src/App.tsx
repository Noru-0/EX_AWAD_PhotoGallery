
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PhotoGrid from './components/PhotoGrid';
import PhotoDetails from './components/PhotoDetails';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<PhotoGrid />} />
            <Route path="/photos/:id" element={<PhotoDetails />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App
