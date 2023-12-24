import React from 'react';
import { Button } from "react-bootstrap";
import "./Air.css";

const Air = ({ numOfRocks, rockName, onScoreChange }) => {
    
    return (
        <div className="AirContainer">
            <Button 
                onClick={() => onScoreChange( rockName, Math.round(numOfRocks / 2))}
                disabled={Math.round(numOfRocks/2) <= 0}
                id = "halfRocks"
            >
                Delete Half the Rocks
            </Button>

        </div>
    )
}

export default Air;