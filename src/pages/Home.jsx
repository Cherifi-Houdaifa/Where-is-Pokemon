import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import pikachu from '../assets/pikachu.png';
import munchlax from '../assets/munchlax.png';

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="content">
            <div className="card" onClick={() => navigate('/pikachu')}>
                <div className="image">
                    <img src={pikachu} alt="Pokemon Photo" />
                </div>
                <div className="data">Find Pikachu</div>
            </div>
            <div className="card" onClick={() => navigate('/munchlax')}>
                <div className="image">
                    <img src={munchlax} alt="Pokemon Photo" />
                </div>
                <div className="data">Find Munchlax</div>
            </div>
        </div>
    );
}
