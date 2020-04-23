/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import PropTypes from 'prop-types';
import './css/board2.scss';

class CatanBoard extends React.Component {
    static propTypes = {
        G: PropTypes.any.isRequired,
        ctx: PropTypes.any.isRequired,
        moves: PropTypes.any.isRequired,
        playerID: PropTypes.string,
        isActive: PropTypes.bool,
        isMultiplayer: PropTypes.bool,
    };

    renderFirstRow() {
        return<ol className="even">
                <li className='hex spacer'></li>
                <li className='hex water'></li>
                <li className='hex water'>
                    <div className='harbor two-one wood'>
                        <div className='harbor-piece br'></div>
                    </div>
                </li>
                <li className='hex water'></li>
                <li className='hex water'>
                    <div className='harbor three-one wood'>
                        <div className='harbor-piece bl'></div>
                    </div>
                </li>
            </ol>
    };

    renderLastRow() {
        return (
            <ol className="even">
                <li className='hex spacer'></li>
                <li className='hex water'></li>
                <li className='hex water'>
                    <div className='harbor two-one any'>
                        <div className='harbor-piece tr'></div>
                    </div>
                </li>
                <li className='hex water'></li>
                <li className='hex water'>
                    <div className='harbor three-one wood'>
                        <div className='harbor-piece tl'></div>
                    </div>
                </li>
            </ol>
        )
    }

    renderSecondRow(tiles, tileValues) {
        let firstTile = this.resolveTileType(tiles, tileValues);
        let secondTile = this.resolveTileType(tiles, tileValues);
        let thirdTile = this.resolveTileType(tiles, tileValues);

        return <ol className="odd">
                <li className='hex spacer'></li>
                <li className='hex water'>
                    <div className='harbor three-one sheep'>
                        <div className='harbor-piece br'></div>
                    </div>
                </li>
                {firstTile}
                {secondTile}
                {thirdTile}
                <li className='hex water'></li>
            </ol>

    }

    renderThirdRow(tiles, tileValues) {
        let firstTile = this.resolveTileType(tiles, tileValues);
        let secondTile = this.resolveTileType(tiles, tileValues);
        let thirdTile = this.resolveTileType(tiles, tileValues);
        let fourthTile = this.resolveTileType(tiles, tileValues);

        return <ol className="even">
                <li className='hex water'></li>
            {firstTile}
            {secondTile}
            {thirdTile}
            {fourthTile}
                <li className='hex water'>
                    <div className='harbor three-one brick'>
                        <div className='harbor-piece l'></div>
                    </div>
                </li>
            </ol>
    }

    renderFourthRow(tiles, tileValues) {
        let firstTile = this.resolveTileType(tiles, tileValues);
        let secondTile = this.resolveTileType(tiles, tileValues);
        let thirdTile = this.resolveTileType(tiles, tileValues);
        let fourthTile = this.resolveTileType(tiles, tileValues);
        let fifthTile = this.resolveTileType(tiles, tileValues);


        return (
            <ol className="odd">
                <li className='hex water'>
                    <div className='harbor three-one sheep'>
                        <div className='harbor-piece r'></div>
                    </div>
                </li>
                {firstTile}
                {secondTile}
                {thirdTile}
                {fourthTile}
                {fifthTile}
                <li className='hex water'>

                </li>
            </ol>
        )
    }

    resolveTileType(tiles, tileValues) {
        let index = Math.floor(Math.random() * tiles.length);
        let tileData = tiles[index];

        let tile;

        while (!tile) {
            if (tileData.used < tileData.max) {
                tile = tileData.type;
                tileData.used++;
            } else {
                index = Math.floor(Math.random() * tiles.length);
                tileData = tiles[index];
            }
        }

        if (tile === ('sand')) {
            let tileClass = 'hex ' + tile;

            return <li className={tileClass}></li>
        } else {
            let numberClass = 'number ' + this.resolveTileValue(tiles, tileValues);
            let tileClass = 'hex ' + tile;

            return <li className={tileClass}>
                <div className={numberClass}></div>
            </li>

        }
    }

    resolveTileValue(tiles, tileValues) {
        let index = Math.floor(Math.random() * tileValues.length);
        let valueData = tileValues[index];

        let tileValue;

        while (!tileValue) {
            if (valueData.used < valueData.max) {
                tileValue = valueData.value;
                valueData.used++;
            } else {
                index = Math.floor(Math.random() * tileValues.length);
                valueData = tileValues[index];
            }
        }

        return tileValue;
    }

    onClick = id => {
        if (this.isActive(id)) {
            this.props.moves.clickCell(id);
        }
    };

    isActive(id) {
        if (!this.props.isActive) return false;
        if (this.props.G.cells[id] !== null) return false;
        return true;
    }

    render() {
        let tiles =  [
            {used:0, max: 4, type: 'sheep'},
            {used:0, max: 4, type: 'wood'},
            {used:0, max: 4, type: 'wheat'},
            {used:0, max: 4, type: 'coal'},
            {used:0, max: 4, type: 'brick'},
            {used:0, max: 1, type: 'sand'}
        ]

        let tileValues = [
            {used: 0, max: 2, value:'two'},
            {used: 0, max: 2, value:'three'},
            {used: 0, max: 2, value:'four'},
            {used: 0, max: 2, value:'five'},
            {used: 0, max: 2, value:'six'},
            {used: 0, max: 2, value:'eight'},
            {used: 0, max: 2, value:'nine'},
            {used: 0, max: 2, value:'ten'},
            {used: 0, max: 2, value:'eleven'},
            {used: 0, max: 2, value:'twelve'}
        ]

        let firstRow = this.renderFirstRow(tiles, tileValues);
        let secondRow = this.renderSecondRow(tiles, tileValues);
        let thirdRow = this.renderThirdRow(tiles, tileValues);
        let fourthRow = this.renderFourthRow(tiles, tileValues);
        let fifthRow = this.renderThirdRow(tiles, tileValues);
        let sixthRow = this.renderSecondRow(tiles, tileValues);
        let lastRow = this.renderLastRow(tiles, tileValues);

        let winner = null;
        if (this.props.ctx.gameover) {
            winner =
                this.props.ctx.gameover.winner !== undefined ? (
                    <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
                ) : (
                    <div id="winner">Draw!</div>
                );
        }

        return (
            <div>
                {firstRow}
                {secondRow}
                {thirdRow}
                {fourthRow}
                {fifthRow}
                {sixthRow}
                {lastRow}
            </div>
        );
    }
}

export default CatanBoard;