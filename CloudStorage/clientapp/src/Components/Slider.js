import React from 'react';
import ReactSlider from "react-slider";

const Slider = ({ size, onScoreChange }) => {
    return (
        <ReactSlider
            className="customSlider"
            thumbClassName="customSlider-thumb"
            trackClassName="customSlider-track"
            markClassName="customSlider-mark"
            marks={2}
            min={50}
            max={600}
            value={size}
            onChange={(size) => onScoreChange(size)}
        />
    );
}; 

export default Slider;


