import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ResumePage from './pages/ResumePage';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={
          <Container fluid className="content">
            <HomePage />
          </Container>
        } />
        <Route path="resume" element={<ResumePage />} />
        <Route path="*" element={
          <Container fluid className="content">
            <NotFoundPage />
          </Container>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
