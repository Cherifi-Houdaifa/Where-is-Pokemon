import React, { useEffect, useRef, useState } from 'react';
import useTimer from 'easytimer-react-hook';
import pikachuPuzzle from '../assets/pikachu-puzzle.png';
import '../styles/Game.css';

import { addRecord } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Pikachu() {
    const [playing, setPlaying] = useState(true);
    const [nameInput, setNameInput] = useState('');
    const [timer] = useTimer();
    const img = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        timer.start();
    }, []);
    // 14 <= x <= 16
    // 69 <= y <= 71
    const imgClickHanler = (e) => {
        let rect = img.current.getBoundingClientRect();
        let width = rect.width;
        let height = rect.height;

        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        let posX = (x / width) * 100;
        let posY = (y / height) * 100;
        console.log(posX, posY);
        if (posX >= 13 && posX <= 16 && posY >= 68 && posY <= 71) {
            console.log(
                `You Won in => ${timer.getTimeValues().minutes}:${
                    timer.getTimeValues().seconds
                }`
            );
            // code for player win
            // 0. stop timer
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
            'pikachuRank'
        );
        // 3. redirect to /pikachurank
        navigate('/pikachurank');
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
                            src={pikachuPuzzle}
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
