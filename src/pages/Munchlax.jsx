import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTimer from 'easytimer-react-hook';
import { addRecord } from '../firebase';
import munchlaxPuzzle from '../assets/munchlax-puzzle.png';
import '../styles/Game.css';

export default function Munchlax() {
    const [playing, setPlaying] = useState(true);
    const [nameInput, setNameInput] = useState('');
    const [timer] = useTimer();
    const img = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        timer.start();
    }, []);
    // 36 <= x <= 39
    // 82 <= y <= 85
    const imgClickHanler = (e) => {
        let rect = img.current.getBoundingClientRect();
        let width = rect.width;
        let height = rect.height;

        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        let posX = (x / width) * 100;
        let posY = (y / height) * 100;
        console.log(posX, posY);
        if (posX >= 36 && posX <= 39 && posY >= 82 && posY <= 85) {
            console.log(
                `You Won in => ${timer.getTimeValues().minutes}:${
                    timer.getTimeValues().seconds
                }`
            );
            timer.pause();
            setPlaying(false);
        }
    };

    const inputNameChangeHandler = (e) => {
        setNameInput(e.target.value);
    };

    const submitBtnHandler = (e) => {
        // 1. make sure name is not too long
        if (nameInput === '') {
            alert('You Must Provide a name');
            return;
        }
        if (nameInput.length > 20) {
            alert('Too Many Charachters');
            return;
        }
        // 2. add Time to database
        addRecord(
            nameInput,
            timer.getTimeValues().minutes * 60 + timer.getTimeValues().seconds,
            'munchlaxRank'
        );
        // 3. redirect to /munchlaxrank
        navigate('/munchlaxrank');
    };
    return (
        <>
            {playing ? (
                <div className="game-content">
                    <div className="timer">
                        <p>
                            {timer.getTimeValues().minutes}:
                            {('0' + timer.getTimeValues().seconds).slice(-2)}
                        </p>
                    </div>
                    <div className="image">
                        <img
                            src={munchlaxPuzzle}
                            ref={img}
                            alt="Puzzle"
                            onClick={imgClickHanler}
                        />
                    </div>
                </div>
            ) : (
                <div className="name-prompt">
                    <h1>You Won</h1>
                    <h2>
                        Record: {timer.getTimeValues().minutes}:
                        {('0' + timer.getTimeValues().seconds).slice(-2)}
                    </h2>
                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            autoComplete="off"
                            value={nameInput}
                            onChange={inputNameChangeHandler}
                            maxLength={20}
                        />
                        <input
                            type="button"
                            value="Submit Record"
                            onClick={submitBtnHandler}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
