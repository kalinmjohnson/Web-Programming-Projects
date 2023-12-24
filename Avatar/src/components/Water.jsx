import "./Water.css";
import React from 'react';
import { Button } from "react-bootstrap";

const Water = ({ numOfRocks, rockName, onScoreChange }) => {
    return (
        <div className="WaterContainer">
            <Button 
                onClick={() => onScoreChange( rockName, numOfRocks * 2)}
                disabled={numOfRocks * 2 >= 1000}
                id = "doubleRock"
            >
                Double the Number of Rocks
            </Button>

        </div>
    )
}

export default Water;