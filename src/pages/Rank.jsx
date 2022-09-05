import React, { useEffect, useState } from 'react';
import { getRecords } from '../firebase';
import '../styles/Rank.css';

export default function Rank({ collec }) {
    const [ranks, setRanks] = useState([]);

    useEffect(() => {
        const fn = async () => {
            const records = await getRecords(collec);
            setRanks(records);
        };
        fn();
    }, []);

    return (
        <div className="ranks-content">
            <div className="header">
                <h1>Top Records</h1>
            </div>
            <hr />
            <div className="records">
                {ranks.map((rank, i) => {
                    return (
                        <div className="record" key={i}>
                            <p>{i + 1}</p>
                            <p>{rank.data().name}</p>
                            <p>{rank.data().record}s</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    // <div>{ranks.map((rank, i) => {
    //     return <div>{rank.data().name}</div>
    // })}</div>;
}
