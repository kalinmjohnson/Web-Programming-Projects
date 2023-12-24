import React from 'react';
import ReactSlider from "react-slider";

const Slider = ({ size, onNewSize }) => {
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
            onChange={(size) => onNewSize(size)}
        />
    );
}; 

export default Slider;


