import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Pikachu from './pages/Pikachu';
import Munchlax from './pages/Munchlax';
import Rank from './pages/Rank';
import About from './pages/About';

export default function App() {
    return (
        <Router basename='/'>
            <NavBar />
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/about' element={<About />}/>
                <Route path='/pikachu' element={<Pikachu />}/>
                <Route path='/munchlax' element={<Munchlax />}/>
                <Route path='/pikachurank' element={<Rank collec="pikachuRank"/>} />
                <Route path='/munchlaxrank' element={<Rank collec="munchlaxRank"/>}/>
            </Routes>
        </Router>
    );
}
