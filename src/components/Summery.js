import React, { useMemo } from 'react';
import defaultImage from '../assets/images/success.png';
import classes from '../styles/Summery.module.css';
import useFetch from './../hooks/useFetch';

export default function Summery({ score, noq }) {
    console.log('Summery')
    const getKeyword = useMemo(() => {
        const scorePercentage = (score / (noq * 5)) * 100;
        if (scorePercentage < 50) {
            return "failed"
        } else if (scorePercentage < 75) {
            return "good";
        } else if (scorePercentage) {
            return "very good";
        } else {
            return "excellent";
        }
    }, [score, noq])

    const url = `https://api.pexels.com/v1/search?query=${getKeyword}&per_page=1`;
    const { loading, error, result } = useFetch(url, "GET", {
        Authorization: process.env.REACT_APP_PEXELS_API_KEY
    });

    const image = result ? result?.photos[0].src.medium : defaultImage;

    return (
        <div className={classes.summary}>
            <div className={classes.point}>
                <p className={classes.score}>
                    Your score is <br />
                    {score} out of {noq * 5}
                </p>
            </div>
            {loading && <div className={classes.badge}>Loading your badge</div>}
            {error && <div className={classes.badge}>An error occurred</div>}
            {!loading && !error && (
                <div className={classes.badge}>
                    <img src={image} alt="Success" />
                </div>
            )}

        </div>
    )
}
