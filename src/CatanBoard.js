import React from 'react';
import PropTypes from 'prop-types';
import Tile from './components/Tile';
import './css/catan-board.scss';

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
        return <ol className="even">
            <Tile type={'spacer'}/>
            <Tile type={'water'}/>
            <Tile
                type={'water'}
                harborType={'two-one wood'}
                harborPiece={'br'}/>
            <Tile type={'water'}/>
            <Tile
                type={'water'}
                harborType={'three-one wood'}
                harborPiece={'bl'}/>
        </ol>
    };

    renderLastRow() {
        return (
            <ol className="even">
                <Tile type={'spacer'}/>
                <Tile type={'water'}/>
                <Tile
                    type={'water'}
                    harborType={'two-one any'}
                    harborPiece={'tr'}/>
                <Tile type={'water'}/>
                <Tile
                    type={'water'}
                    harborType={'three-one wood'}
                    harborPiece={'tl'}/>
            </ol>
        )
    }

    renderSecondRow(tiles, tileValues) {
        let firstTile = this.resolveTileType(tiles, tileValues);
        let secondTile = this.resolveTileType(tiles, tileValues);
        let thirdTile = this.resolveTileType(tiles, tileValues);

        return <ol className="odd">
            <Tile type={'spacer'}/>
            <Tile
                type={'water'}
                harborType={'three-one sheep'}
                harborPiece={'br'}/>
            {firstTile}
            {secondTile}
            {thirdTile}
            <Tile type={'water'}/>
        </ol>

    }

    renderThirdRow(tiles, tileValues) {
        let firstTile = this.resolveTileType(tiles, tileValues);
        let secondTile = this.resolveTileType(tiles, tileValues);
        let thirdTile = this.resolveTileType(tiles, tileValues);
        let fourthTile = this.resolveTileType(tiles, tileValues);

        return <ol className="even">
            <Tile type={'water'}/>
            {firstTile}
            {secondTile}
            {thirdTile}
            {fourthTile}
            <Tile
                type={'water'}
                harborType={'three-one brick'}
                harborPiece={'l'}/>
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
                <Tile
                    type={'water'}
                    harborType={'three-one sheep'}
                    harborPiece={'r'}/>
                {firstTile}
                {secondTile}
                {thirdTile}
                {fourthTile}
                {fifthTile}
                <Tile type={'water'}/>
            </ol>
        )
    }

    resolveTileType(tiles, tileValues) {
        let index = Math.floor(Math.random() * tiles.length);
        let tileData = tiles[index];

        let type;

        while (!type) {
            if (tileData.used < tileData.max) {
                type = tileData.type;
                tileData.used++;
            } else {
                index = Math.floor(Math.random() * tiles.length);
                tileData = tiles[index];
            }
        }

        if (type === ('sand')) {
            return <Tile type={type}></Tile>
        } else {
            return <Tile type={type}
                         value={this.resolveTileValue(tiles, tileValues)}/>
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
        let tiles = [
            {used: 0, max: 4, type: 'sheep'},
            {used: 0, max: 4, type: 'wood'},
            {used: 0, max: 4, type: 'wheat'},
            {used: 0, max: 4, type: 'coal'},
            {used: 0, max: 4, type: 'brick'},
            {used: 0, max: 1, type: 'sand'}
        ]

        let tileValues = [
            {used: 0, max: 2, value: 'two'},
            {used: 0, max: 2, value: 'three'},
            {used: 0, max: 2, value: 'four'},
            {used: 0, max: 2, value: 'five'},
            {used: 0, max: 2, value: 'six'},
            {used: 0, max: 2, value: 'eight'},
            {used: 0, max: 2, value: 'nine'},
            {used: 0, max: 2, value: 'ten'},
            {used: 0, max: 2, value: 'eleven'},
            {used: 0, max: 2, value: 'twelve'}
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