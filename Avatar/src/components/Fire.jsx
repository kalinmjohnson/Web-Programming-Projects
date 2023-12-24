import "./Fire.css";

import React from 'react';
import { Button } from "react-bootstrap";

const Fire = ({ numOfRocks, rockName, onScoreChange }) => {
    
    return (
        <div id="FireContainer">
            <Button 
                onClick={() => onScoreChange( rockName, 0 )}
                disabled={Math.round(numOfRocks) <= 0}
                id = "burnRocks"
            >
                Delete ALL the Rocks
            </Button>

        </div>
    )
}

export default Fire;