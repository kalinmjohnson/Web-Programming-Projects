import React from 'react';
import { Button } from "react-bootstrap";
import "./Earth.css";

const Earth = ({ numOfRocks, rockName, onScoreChange }) => {
    return (
        <div className="EarthContainer">
            <Button 
                onClick={() => onScoreChange( rockName, numOfRocks + 1)}
                disabled={numOfRocks >= 1000}
                className = "makeRock"
            >
                Create One Rock
            </Button>

            <Button 
                onClick={() => onScoreChange( rockName, numOfRocks + 2)}
                disabled={numOfRocks >= 999}
                className = "makeRock"
            >
                Create Two Rocks
            </Button>

            <Button 
                onClick={() => onScoreChange( rockName, numOfRocks + 3)}
                disabled={numOfRocks >= 998}
                className = "makeRock"
            >
                Create Three Rocks
            </Button>

        </div>
    )
}

export default Earth;