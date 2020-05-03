import React from 'react';
import Tile from "./Tile";

class WaterTile extends Tile{
    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement(Tile);
    }
}

export default WaterTile;