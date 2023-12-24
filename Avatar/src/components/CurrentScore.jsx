import React from 'react';
import "./CurrentScore.css";

const CurrentScore = ({ numOfRocks }) => {
    return (
        <div className="currentScoreContainer">
            Current Number of Rocks: {numOfRocks}
        </div>
    )
}

export default CurrentScore;