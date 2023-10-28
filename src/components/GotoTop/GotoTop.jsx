"use client"
import React, { useEffect, useState } from 'react';
import './GotoTop.css';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const GotoTop = () => {
    const gototop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    const [isVisible, setIsVisible] = useState(false);
    const listenToScroll = () => {
        let heightToHidden = 20;
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop;

        if (winScroll > heightToHidden) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);
        return () => window.removeEventListener("scroll", listenToScroll);
    }, []);
    return (
        <>
            {
                isVisible &&
                (<div className="Gototop" onClick={gototop}>
                    <div className="topBtn__container">
                            <ArrowUpwardIcon className="arrow__up"/>
                    </div>
                </div>)
            }
        </>
    )
}

export default GotoTop