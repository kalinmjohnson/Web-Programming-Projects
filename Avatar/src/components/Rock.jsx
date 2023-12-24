import React from 'react';
import { useState } from 'react';
import "./Rock.css";

const Rock = () => {

    const getRandomSize = () => {
        const ranNum = (Math.random() * 30 + 10 + Math.random()).toFixed(2);
        return ranNum + 'px';
    }

    const [size] = useState(getRandomSize());

    return (
        <div className="rockContainer">
            <img src="https://clipart-library.com/img/2022764.png" alt="rock" id="rock" style= {{
                width: size,
                height: size
            }}
            
            ></img>
        </div>
    )
}

export default React.memo(Rock);