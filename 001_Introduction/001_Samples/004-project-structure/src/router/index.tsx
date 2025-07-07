import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export const AppRouter = () => (
    <Router>
        <Routes>
            <Route path='/' element={<div />} />
        </Routes>
    </Router>
);